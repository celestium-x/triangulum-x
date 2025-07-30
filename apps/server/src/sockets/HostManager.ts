import Redis from 'ioredis';
import { CookiePayload, CustomWebSocket, HOST_MESSAGE_TYPES } from '../types/web-socket-types';
import QuizManager from './QuizManager';
import prisma from '@repo/db/client';
import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws';

export interface HostManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socketMapping: Map<string, CustomWebSocket>;
    sessionHostMapping: Map<string, string>;
    quizManager: QuizManager;
}

export default class HostManager {
    private publisher: Redis;
    private subscriber: Redis;
    private socketMapping: Map<string, CustomWebSocket>;
    private sessionHostMapping: Map<string, string>;
    private quizManager: QuizManager;

    constructor(dependencies: HostManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.socketMapping = dependencies.socketMapping;
        this.sessionHostMapping = dependencies.sessionHostMapping;
        this.quizManager = dependencies.quizManager;
    }

    public async handle_connection(ws: CustomWebSocket, payload: CookiePayload): Promise<void> {
        const isValidHost = await this.validateHostInDB(payload.quizId, payload.userId);
        if (!isValidHost) {
            ws.close();
            return;
        }
        const existing_host_socket_id = this.sessionHostMapping.get(payload.gameSessionId);
        if (existing_host_socket_id) {
            const host_existing_socket = this.socketMapping.get(existing_host_socket_id);
            if (host_existing_socket && host_existing_socket.readyState === WebSocket.OPEN) {
                host_existing_socket.close();
            }
        }

        ws.user = payload;
        ws.id = this.generateSocketId();
        this.socketMapping.set(ws.id, ws);
        this.sessionHostMapping.set(payload.gameSessionId, ws.id);
        this.quizManager.onHostconnect(payload.gameSessionId, ws.id);
        this.setup_message_handlers(ws);
    }

    private setup_message_handlers(ws: CustomWebSocket) {
        ws.on('message', (data) => {
            try {
                const message = JSON.parse(data.toString());
                this.handle_host_message(ws, message);
            } catch (err) {
                console.error('Error parsing message', err);
            }
        });
    }

    private handle_host_message(ws: CustomWebSocket, message: any) {
        const { type } = message;
        switch (type) {
            case HOST_MESSAGE_TYPES.JOIN_GAME_SESSION:
                // this.handle_join_game_session(ws, payload);
                break;
            default:
                console.error('Unknown message type', type);
                break;
        }
    }

    private async validateHostInDB(quizId: string, hostId: string): Promise<boolean> {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId, hostId },
        });
        return !!quiz;
    }

    private generateSocketId(): string {
        return uuid();
    }
}
