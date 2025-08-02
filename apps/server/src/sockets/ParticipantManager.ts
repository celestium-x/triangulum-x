import Redis from 'ioredis';
import QuizManager from './QuizManager';
import { CookiePayload, CustomWebSocket, MESSAGE_TYPES } from '../types/web-socket-types';
import prisma from '@repo/db/client';
import { v4 as uuid } from 'uuid';
import DatabaseQueue from '../queue/DatabaseQueue';

export interface ParticipantManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socket_mapping: Map<string, CustomWebSocket>;
    session_participants_mapping: Map<string, Set<string>>;
    quizManager: QuizManager;
    databaseQueue: DatabaseQueue;
}

export default class ParticipantManager {
    private publisher: Redis;
    private subscriber: Redis;
    private session_participants_mapping: Map<string, Set<string>>;
    private quizManager: QuizManager;
    private socket_mapping: Map<string, CustomWebSocket>;
    private database_queue: DatabaseQueue;

    private participant_socket_mapping: Map<string, string> = new Map(); // Map<participantId, socketId>

    constructor(dependencies: ParticipantManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.socket_mapping = dependencies.socket_mapping;
        this.session_participants_mapping = dependencies.session_participants_mapping;
        this.quizManager = dependencies.quizManager;
        this.database_queue = dependencies.databaseQueue;
    }

    public async handle_connection(ws: CustomWebSocket, payload: CookiePayload) {
        const is_valid_participant = await this.validate_participant_in_db(
            payload.quizId,
            payload.userId,
        );
        if (!is_valid_participant) {
            ws.close();
            return;
        }
        this.cleanup_existing_partiicpant_socket(payload.userId, payload.gameSessionId);

        const new_participant_socket_id = this.generateSocketId();

        ws.id = new_participant_socket_id;
        ws.user = payload;

        this.socket_mapping.set(new_participant_socket_id, ws);
        this.participant_socket_mapping.set(payload.userId, new_participant_socket_id);

        const session_participants_socket_ids = this.session_participants_mapping.get(
            payload.gameSessionId,
        );

        if (!session_participants_socket_ids) {
            this.session_participants_mapping.set(payload.gameSessionId, new Set());
        }

        this.session_participants_mapping
            .get(payload.gameSessionId)
            ?.add(new_participant_socket_id);
        this.setup_message_handlers(ws);

        this.quizManager.onParticipantConnect(payload);
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
        const { type } = message;
        switch (type) {
            case MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION:
                // this.handle_join_game_session(ws, payload);
                break;

            // case MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE:
            //     this.handle_participant_name_change(payload, ws.user.userId);
            //     break;

            default:
                console.error('Unknown message type', type);
                break;
        }
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

    private send_message_to_participant(participant_id: string, message: any) {
        const socket_id = this.participant_socket_mapping.get(participant_id);
        if (socket_id) {
            const socket = this.socket_mapping.get(socket_id);
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            }
        }
    }

    // private async handle_participant_name_change(payload: ParticipantNameChangeEvent, participant_id: string) {
    //     const { }
    //     const participant = await prisma.participant.update({
    //         where: {
    //             id: participant_id
    //         },
    //         data: {
    //             nickname:
    //         }
    //     })
    // }

    private generateSocketId(): string {
        return uuid();
    }
}
