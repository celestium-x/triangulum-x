import Redis from 'ioredis';
import {
    CookiePayload,
    CustomWebSocket,
    MESSAGE_TYPES,
    PubSubMessageTypes,
} from '../types/web-socket-types';
import QuizManager from './QuizManager';
import prisma, { HostScreen, ParticipantScreen, SpectatorScreen } from '@repo/db/client';
import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws';
import DatabaseQueue from '../queue/DatabaseQueue';
import RedisCache from '../cache/RedisCache';

export interface HostManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    socketMapping: Map<string, CustomWebSocket>;
    sessionHostMapping: Map<string, string>;
    quizManager: QuizManager;
    databaseQueue: DatabaseQueue;
    redis_cache: RedisCache;
}

export default class HostManager {
    private publisher: Redis;
    private subscriber: Redis;
    private socketMapping: Map<string, CustomWebSocket>;
    private sessionHostMapping: Map<string, string>;
    private quizManager: QuizManager;
    private database_queue: DatabaseQueue;
    private redis_cache: RedisCache;

    constructor(dependencies: HostManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.socketMapping = dependencies.socketMapping;
        this.sessionHostMapping = dependencies.sessionHostMapping;
        this.quizManager = dependencies.quizManager;
        this.database_queue = dependencies.databaseQueue;
        this.redis_cache = dependencies.redis_cache;
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
        this.quizManager.onHostconnect(payload.gameSessionId, payload.quizId, ws.id);
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
        const { type, payload } = message;
        switch (type) {
            case MESSAGE_TYPES.HOST_CHANGE_QUESTION_PREVIEW:
                this.handle_host_question_preview_page_change(ws);
                break;
            case MESSAGE_TYPES.REACTION_EVENT:
                this.handle_incoming_reaction_event(payload, ws);
                break;

            case MESSAGE_TYPES.HOST_LAUNCH_QUESTION:
                this.handle_question_launch(payload, ws);
                break;

            default:
                console.error('Unknown message type', type);
                break;
        }
    }

    private async handle_question_launch(payload: any, ws: CustomWebSocket) {
        const { questionId, questionIndex } = payload;
        const { gameSessionId: game_session_id } = ws.user;

        const quiz = await this.redis_cache.get_quiz(game_session_id);

        if (!quiz) {
            throw new Error("Quiz doesn't exist in game_session");
        }

        const question = quiz.questions?.[questionIndex];

        if (!question) {
            throw new Error("Questions doesn't exist in quiz");
        }

        await this.database_queue.update_game_session(
            game_session_id,
            {
                currentQuestionIndex: questionIndex,
                currentQuestionId: questionId,
                hostScreen: HostScreen.QUESTION_READING,
                spectatorScreen: SpectatorScreen.QUESTION_READING,
                participantScreen: ParticipantScreen.QUESTION_READING,
            },
            game_session_id,
        );

        // const message: PubSubMessageTypes = {
        //     type: MESSAGE_TYPES.HOST_LAUNCH_QUESTION,
        //     payload: {},
        // };
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

    private async validateHostInDB(quizId: string, hostId: string): Promise<boolean> {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId, hostId },
        });
        return !!quiz;
    }

    private async handle_host_question_preview_page_change(ws: CustomWebSocket) {
        const { gameSessionId: game_session_id } = ws.user;
        const gameSession = await this.redis_cache.get_game_session(game_session_id);

        if (gameSession?.hostScreen === 'QUESTION_PREVIEW') {
            return;
        }

        const { data } = await this.database_queue.update_game_session(
            ws.user.userId,
            { hostScreen: 'QUESTION_PREVIEW' },
            game_session_id,
        );

        const event_data: PubSubMessageTypes = {
            type: MESSAGE_TYPES.HOST_CHANGE_QUESTION_PREVIEW,
            payload: {
                id: ws.user.userId,
                hostScreen: data.hostScreen,
            },
        };

        this.quizManager.publish_event_to_redis(game_session_id, event_data);
    }

    private generateSocketId(): string {
        return uuid();
    }
}
