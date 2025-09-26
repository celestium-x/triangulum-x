import Redis from 'ioredis';
import {
    CookiePayload,
    CustomWebSocket,
    IncomingChatMessage,
    IncomingChatReaction,
    MESSAGE_TYPES,
    PubSubMessageTypes,
    SpectatorNameChangeEvent,
} from '../types/web-socket-types';
import QuizManager from './QuizManager';
import prisma from '@repo/db/client';
import { v4 as uuid } from 'uuid';
import DatabaseQueue from '../queue/DatabaseQueue';
import RedisCache from '../cache/RedisCache';
import QuizSettings from '../class/quizSettings';
import { quizSettingInstance } from '../services/init-services';

interface SpectatorManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socket_mapping: Map<string, CustomWebSocket>;
    session_spectator_mapping: Map<string, Set<string>>;
    quizManager: QuizManager;
    database_queue: DatabaseQueue;
    redis_cache: RedisCache;
}

export default class SpectatorManager {
    private session_spectators_mapping: Map<string, Set<string>>;
    private quizManager: QuizManager;
    private socket_mapping: Map<string, CustomWebSocket>;
    private database_queue: DatabaseQueue;
    private quiz_settings: QuizSettings;
    redis_cache: RedisCache;

    private spectator_socket_mapping: Map<string, string> = new Map(); // Map<spectatorId, socketId>

    constructor(dependencies: SpectatorManagerDependencies) {
        this.session_spectators_mapping = dependencies.session_spectator_mapping;
        this.quizManager = dependencies.quizManager;
        this.socket_mapping = dependencies.socket_mapping;
        this.database_queue = dependencies.database_queue;
        this.redis_cache = dependencies.redis_cache;
        this.quiz_settings = quizSettingInstance;
    }

    public async handle_connection(ws: CustomWebSocket, payload: CookiePayload): Promise<void> {
        const is_valid_spectator = await this.validateSpectatorInDb(payload.quizId, payload.userId);

        if (!is_valid_spectator) {
            ws.close();
            return;
        }

        this.cleanup_existing_spectator_socket(payload.userId, payload.gameSessionId);

        const new_spectator_socket_id = this.generateSocketId();
        ws.id = new_spectator_socket_id;
        ws.user = payload;
        this.socket_mapping.set(new_spectator_socket_id, ws);

        this.spectator_socket_mapping.set(payload.userId, new_spectator_socket_id);
        const session_spectators_socket_ids = this.session_spectators_mapping.get(
            payload.gameSessionId,
        );
        if (!session_spectators_socket_ids) {
            this.session_spectators_mapping.set(payload.gameSessionId, new Set());
        }

        this.session_spectators_mapping.get(payload.gameSessionId)?.add(new_spectator_socket_id);

        this.setup_message_handlers(ws);

        this.quizManager.onSpectatorConnect(payload);
    }

    private cleanup_existing_spectator_socket(spectator_id: string, game_session_id: string) {
        const existing_spectator_socket_id = this.spectator_socket_mapping.get(spectator_id);

        if (existing_spectator_socket_id) {
            const existing_socket = this.socket_mapping.get(existing_spectator_socket_id);

            if (existing_socket) existing_socket.close();

            this.socket_mapping.delete(existing_spectator_socket_id);
            this.spectator_socket_mapping.delete(spectator_id);

            const session_spectators_socket_ids =
                this.session_spectators_mapping.get(game_session_id);

            if (session_spectators_socket_ids) {
                session_spectators_socket_ids.delete(existing_spectator_socket_id);
            }
        }
    }

    private setup_message_handlers(ws: CustomWebSocket) {
        ws.on('message', (data) => {
            try {
                const message = JSON.parse(data.toString());
                this.handle_spectator_message(ws, message);
            } catch (err) {
                console.error('Error parsing message', err);
            }
        });

        ws.on('close', () => {
            // this.handle_spectator_leave_gamesession(ws);
            this.cleanup_spectator_socket(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    private handle_spectator_message(ws: CustomWebSocket, message: any) {
        const { type, payload } = message;

        switch (type) {
            case MESSAGE_TYPES.SPECTATOR_NAME_CHANGE:
                this.handle_spectator_name_change(payload, ws);
                break;

            case MESSAGE_TYPES.INTERACTION_EVENT:
                this.handle_incoming_interaction_event(payload, ws);
                break;

            case MESSAGE_TYPES.CHAT_MESSAGE:
                this.handle_send_chat_message(payload, ws);
                break;

            case MESSAGE_TYPES.CHAT_REACTION_EVENT:
                this.handle_incoming_chat_reaction_event(payload, ws);
                break;

            case MESSAGE_TYPES.SPECTATOR_LEAVE_GAME_SESSION:
                this.handle_spectator_leave_gamesession(ws);
                break;

            default:
                console.error('Unknown message type: ', type);
                break;
        }
    }

    private handle_incoming_interaction_event(payload: any, ws: CustomWebSocket) {
        const { reactionType } = payload;
        const published_message: PubSubMessageTypes = {
            type: MESSAGE_TYPES.INTERACTION_EVENT,
            payload: {
                reactionType,
            },
            exclude_socket_id: ws.id,
        };
        this.quizManager.publish_event_to_redis(ws.user.gameSessionId, published_message);
    }

    private cleanup_spectator_socket(ws: CustomWebSocket): void {
        if (!ws.id || !ws.user) {
            return;
        }

        const socket_id = ws.id;
        const spectator_id = ws.user.userId;
        const game_session_id = ws.user.gameSessionId;

        this.socket_mapping.delete(socket_id);
        this.spectator_socket_mapping.delete(spectator_id);
        const session_spectators_socket_ids = this.session_spectators_mapping.get(game_session_id);
        if (session_spectators_socket_ids) {
            session_spectators_socket_ids.delete(socket_id);
            if (session_spectators_socket_ids.size === 0) {
                this.session_spectators_mapping.delete(game_session_id);
            }
        }
    }

    private async validateSpectatorInDb(quizId: string, spectatorId: string): Promise<boolean> {
        const spectator = await prisma.spectator.findUnique({
            where: {
                id: spectatorId,
                quizId: quizId,
            },
        });

        return !!spectator;
    }

    private async send_message_to_spectator(spectator_id: string, message: any) {
        const socket_id = this.spectator_socket_mapping.get(spectator_id);
        if (socket_id) {
            const socket = this.socket_mapping.get(socket_id);
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            }
        }
    }

    private async handle_spectator_name_change(
        payload: SpectatorNameChangeEvent,
        ws: CustomWebSocket,
    ) {
        const { gameSessionId: game_session_id } = ws.user;
        const { choosenNickname } = payload;

        const { data } = await this.database_queue.update_spectator(
            ws.user.userId,
            { nickname: choosenNickname, isNameChanged: true },
            game_session_id,
        );

        const event_data: PubSubMessageTypes = {
            type: MESSAGE_TYPES.SPECTATOR_NAME_CHANGE,
            payload: {
                id: ws.user.userId,
                nickname: data.spectator.nickname,
            },
        };

        this.quizManager.publish_event_to_redis(game_session_id, event_data);
    }

    private async handle_send_chat_message(payload: IncomingChatMessage, ws: CustomWebSocket) {
        const { gameSessionId, quizId, userId: sender_id, role: sender_role } = ws.user;
        const { senderName, message, repliedToId, senderAvatar } = payload;

        const is_chat_allowed = this.quiz_settings.quiz_settings_mapping.get(
            ws.user.gameSessionId,
        )?.liveChat;
        if (!is_chat_allowed) return;

        if (!quizId || !sender_id || !message) {
            console.error('Missing required fields in chat message payload:', {
                quizId,
                message,
            });
            return;
        }

        const chatMessage = {
            senderId: sender_id,
            senderRole: sender_role,
            senderName: senderName,
            senderAvatar: senderAvatar,
            message,
            repliedToId: repliedToId ?? null,
        };

        const event_data: PubSubMessageTypes = {
            type: MESSAGE_TYPES.CHAT_MESSAGE,
            payload: {
                id: ws.user.userId,
                payload: payload,
            },
            exclude_socket_id: ws.user.userId,
        };

        this.quizManager.publish_event_to_redis(gameSessionId, event_data);

        this.database_queue
            .create_chat_message(gameSessionId, gameSessionId, quizId, chatMessage)
            .catch((err) => {
                console.error('Failed to enqueue chat message:', err);
            });
    }

    private handle_incoming_chat_reaction_event(
        payload: IncomingChatReaction,
        ws: CustomWebSocket,
    ) {
        const { userId } = ws.user;
        const { chatMessageId, reactedAt, reaction, reactorAvatar, reactorName, reactorType } =
            payload;

        if (!chatMessageId) {
            console.error('Missing required fields in chat reactuon payload:', {
                chatMessageId,
            });
            return;
        }

        const chatReaction = {
            reaction,
            reactedAt,
            reactorName,
            reactorAvatar,
            reactorType,
        };

        const published_message: PubSubMessageTypes = {
            type: MESSAGE_TYPES.CHAT_REACTION_EVENT,
            payload: {
                chatMessageId,
                reaction,
                reactedAt,
                reactorName,
                reactorAvatar,
                reactorType,
            },
            exclude_socket_id: ws.id,
        };

        this.quizManager.publish_event_to_redis(ws.user.gameSessionId, published_message);

        this.database_queue
            .create_chat_reaction(userId, chatMessageId, chatReaction)
            .catch((err) => {
                console.error('Failed to enqueue chat reaction: ', err);
            });
    }

    private generateSocketId(): string {
        return uuid();
    }

    private async handle_spectator_leave_gamesession(ws: CustomWebSocket) {
        const { gameSessionId: game_session_id } = ws.user;
        const user_id = ws.user.userId;

        const spectator_cache = await this.redis_cache.get_spectator(game_session_id, user_id);

        if (!spectator_cache) {
            return;
        }

        const event_data: PubSubMessageTypes = {
            type: MESSAGE_TYPES.SPECTATOR_LEAVE_GAME_SESSION,
            payload: {
                userId: user_id,
            },
            exclude_socket_id: ws.id,
        };

        this.quizManager.publish_event_to_redis(game_session_id, event_data);

        // delete the user from the database
        // either do this or add another schema for showing this user was removed
        this.database_queue.delete_spectator(user_id, game_session_id);
    }
}
