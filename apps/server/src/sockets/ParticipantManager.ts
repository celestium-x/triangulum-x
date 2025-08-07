import Redis from 'ioredis';
import QuizManager from './QuizManager';
import {
    CookiePayload,
    CustomWebSocket,
    MESSAGE_TYPES,
    ParticipantNameChangeEvent,
    PubSubMessageTypes,
} from '../types/web-socket-types';
import prisma from '@repo/db/client';
import { v4 as uuid } from 'uuid';
import DatabaseQueue from '../queue/DatabaseQueue';
import RedisCache from '../cache/RedisCache';

export interface ParticipantManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socket_mapping: Map<string, CustomWebSocket>;
    session_participants_mapping: Map<string, Set<string>>;
    quizManager: QuizManager;
    databaseQueue: DatabaseQueue;
    redis_cache: RedisCache;
}

export default class ParticipantManager {
    private publisher: Redis;
    private subscriber: Redis;
    private session_participants_mapping: Map<string, Set<string>>;
    private quizManager: QuizManager;
    private socket_mapping: Map<string, CustomWebSocket>;
    private database_queue: DatabaseQueue;
    private redis_cache: RedisCache;

    private participant_socket_mapping: Map<string, string> = new Map(); // Map<participantId, socketId>

    constructor(dependencies: ParticipantManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.socket_mapping = dependencies.socket_mapping;
        this.session_participants_mapping = dependencies.session_participants_mapping;
        this.quizManager = dependencies.quizManager;
        this.database_queue = dependencies.databaseQueue;
        this.redis_cache = dependencies.redis_cache;
    }

    public async handle_connection(ws: CustomWebSocket, decoded_cookie_payload: CookiePayload) {
        const is_valid_participant = await this.validate_participant_in_db(
            decoded_cookie_payload.quizId,
            decoded_cookie_payload.userId,
        );
        if (!is_valid_participant) {
            ws.close();
            return;
        }
        this.cleanup_existing_partiicpant_socket(
            decoded_cookie_payload.userId,
            decoded_cookie_payload.gameSessionId,
        );

        const new_participant_socket_id = this.generateSocketId();

        ws.id = new_participant_socket_id;
        ws.user = decoded_cookie_payload;

        this.socket_mapping.set(new_participant_socket_id, ws);
        this.participant_socket_mapping.set(
            decoded_cookie_payload.userId,
            new_participant_socket_id,
        );

        const session_participants_socket_ids = this.session_participants_mapping.get(
            decoded_cookie_payload.gameSessionId,
        );

        if (!session_participants_socket_ids) {
            this.session_participants_mapping.set(decoded_cookie_payload.gameSessionId, new Set());
        }

        this.session_participants_mapping
            .get(decoded_cookie_payload.gameSessionId)
            ?.add(new_participant_socket_id);
        this.setup_message_handlers(ws);

        this.quizManager.onParticipantConnect(decoded_cookie_payload);
    }

    private setup_message_handlers(ws: CustomWebSocket) {
        ws.on('message', (data) => {
            try {
                const message = JSON.parse(data.toString());
                this.handle_participant_message(ws, message);
            } catch (err) {
                console.error('Error parsing message', err);
            }
        });

        ws.on('close', () => {
            this.cleanup_participant_socket(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.cleanup_participant_socket(ws);
        });
    }

    private handle_participant_message(ws: CustomWebSocket, message: any) {
        const { type, payload } = message;
        switch (type) {
            case MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE:
                this.handle_participant_name_change(payload, ws);
                break;
            case MESSAGE_TYPES.REACTION_EVENT:
                this.handle_incoming_reaction_event(payload, ws);
                break;
            default:
                console.error('Unknown message type at participant manager', type);
                break;
        }
    }

    private handle_incoming_reaction_event(payload: any, ws: CustomWebSocket) {
        const { reactionType } = payload;
        const published_message: PubSubMessageTypes = {
            type: MESSAGE_TYPES.REACTION_EVENT,
            payload: {
                reactionType,
            },
            exclude_socket_id: ws.id,
        };
        this.quizManager.publish_event_to_redis(ws.user.gameSessionId, published_message);
    }

    private send_message_to_participant(participant_id: string, message: any) {
        const socket_id = this.participant_socket_mapping.get(participant_id);
        if (socket_id) {
            const socket = this.socket_mapping.get(socket_id);
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            }
        }
    }

    private async handle_participant_name_change(
        payload: ParticipantNameChangeEvent,
        ws: CustomWebSocket,
    ) {
        const { gameSessionId: game_session_id } = ws.user;
        const { choosenNickname } = payload;
        const participant = await this.redis_cache.get_participant(game_session_id, ws.user.userId);
        if (participant.isNameChanged) {
            return;
        }

        const { data } = await this.database_queue.update_participant(
            ws.user.userId,
            { nickname: choosenNickname, isNameChanged: true },
            game_session_id,
        );

        const event_data: PubSubMessageTypes = {
            type: MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE,
            payload: {
                id: ws.user.userId,
                nickname: data.participant.nickname,
                isNameChanged: data.participant.isNameChanged,
            },
        };
        this.quizManager.publish_event_to_redis(game_session_id, event_data);
    }

    private cleanup_existing_partiicpant_socket(
        participant_id: string,
        game_session_id: string,
    ): void {
        const existing_participant_socket_id = this.participant_socket_mapping.get(participant_id);
        if (existing_participant_socket_id) {
            const existing_socket = this.socket_mapping.get(existing_participant_socket_id);
            if (existing_socket) existing_socket.close();
            this.socket_mapping.delete(existing_participant_socket_id);
            this.participant_socket_mapping.delete(participant_id);
            const session_participants_socket_ids =
                this.session_participants_mapping.get(game_session_id);
            if (session_participants_socket_ids) {
                session_participants_socket_ids.delete(existing_participant_socket_id);
            }
        }
    }

    private cleanup_participant_socket(ws: CustomWebSocket): void {
        if (!ws.id || !ws.user) {
            return;
        }

        const socket_id = ws.id;
        const participant_id = ws.user.userId;
        const game_session_id = ws.user.gameSessionId;

        this.socket_mapping.delete(socket_id);
        this.participant_socket_mapping.delete(participant_id);
        const session_participants_socket_ids =
            this.session_participants_mapping.get(game_session_id);
        if (session_participants_socket_ids) {
            session_participants_socket_ids.delete(socket_id);
            if (session_participants_socket_ids.size === 0) {
                this.session_participants_mapping.delete(game_session_id);
            }
        }
    }

    private async validate_participant_in_db(
        quizId: string,
        participantId: string,
    ): Promise<boolean> {
        const participant = await prisma.participant.findUnique({
            where: {
                id: participantId,
                quizId: quizId,
            },
        });
        return !!participant;
    }

    private generateSocketId(): string {
        return uuid();
    }
}
