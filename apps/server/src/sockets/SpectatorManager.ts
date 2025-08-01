import Redis from 'ioredis';
import { CookiePayload, CustomWebSocket, MESSAGE_TYPES } from '../types/web-socket-types';
import QuizManager from './QuizManager';
import prisma from '@repo/db/client';
import { v4 as uuid } from 'uuid';

interface SpectatorManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socket_mapping: Map<string, CustomWebSocket>;
    session_spectator_mapping: Map<string, Set<string>>;
    quizManager: QuizManager;
}

export default class SpectatorManager {
    private publisher: Redis;
    private subscriber: Redis;
    private session_spectators_mapping: Map<string, Set<string>>;
    private quizManager: QuizManager;
    private socket_mapping: Map<string, CustomWebSocket>;

    private spectator_socket_mapping: Map<string, string> = new Map(); // Map<spectatorId, socketId>

    constructor(dependencies: SpectatorManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.session_spectators_mapping = dependencies.session_spectator_mapping;
        this.quizManager = dependencies.quizManager;
        this.socket_mapping = dependencies.socket_mapping;
    }

    public async handle_connection(ws: CustomWebSocket, payload: CookiePayload): Promise<void> {
        const is_valid_spectator = this.validateSpectatorInDb(payload.quizId, payload.userId);

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
        if (session_spectators_socket_ids) {
            session_spectators_socket_ids.add(new_spectator_socket_id);
        }
        this.setup_message_handlers(ws);
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
            this.cleanup_spectator_socket(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.cleanup_spectator_socket(ws);
        });
    }

    private handle_spectator_message(ws: CustomWebSocket, message: any) {
        const { type } = message;
        switch (type) {
            case MESSAGE_TYPES.SPECTATOR_JOIN_GAME_SESSION:
                // joint the spectator
                break;
            default:
                console.error('Unknown message type', type);
                break;
        }
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

    private generateSocketId(): string {
        return uuid();
    }
}
