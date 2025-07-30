import Redis from 'ioredis';
import { CookiePayload, CustomWebSocket } from '../types/web-socket-types';
import QuizManager from './QuizManager';
import prisma from '@repo/db/client';
import { v4 as uuid } from 'uuid';

interface SpectatorManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socketMapping: Map<string, CustomWebSocket>;
    sessionSpectatorMapping: Map<string, string>;
    quizManager: QuizManager;
}

export default class SpectatorManager {
    private publisher: Redis;
    private subscriber: Redis;
    private socketMapping: Map<string, CustomWebSocket> = new Map<string, CustomWebSocket>();
    private sessionSpectatorMapping: Map<string, string> = new Map<string, string>();
    private quizManager: QuizManager;

    constructor(dependencies: SpectatorManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.socketMapping = dependencies.socketMapping;
        this.sessionSpectatorMapping = dependencies.sessionSpectatorMapping;
        this.quizManager = dependencies.quizManager;
    }

    public async handle_connection(ws: CustomWebSocket, payload: CookiePayload): Promise<void> {
        const isValidSpectator = await this.validateSpectatorInDb(payload.quizId, payload.userId);
        if (!isValidSpectator) {
            ws.close();
            return;
        }

        const existing_spectator_socket_id = this.sessionSpectatorMapping.get(
            payload.gameSessionId,
        );
        if (existing_spectator_socket_id) {
            const spectator_existing_socket = this.socketMapping.get(existing_spectator_socket_id);
            if (
                spectator_existing_socket &&
                spectator_existing_socket.readyState === WebSocket.OPEN
            ) {
                spectator_existing_socket.close();
            }
        }

        ws.user = payload;
        ws.id = this.generateSocketId();
        this.socketMapping.set(ws.id, ws);
        this.sessionSpectatorMapping.set(payload.gameSessionId, ws.id);
        // this.quizManager.onSpectatorConnect(payload.gameSessionId, ws.id);
        // this.setup_message_handlers(ws);
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
