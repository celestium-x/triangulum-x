import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';
import Redis from 'ioredis';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HostManager from './HostManager';
import QuizManager from './QuizManager';
import RedisCache from '../cache/RedisCache';
import { URL } from 'url';
import ParticipantManager from './ParticipantManager';
import SpectatorManager from './SpectatorManager';
import {
    CookiePayload,
    CustomWebSocket,
    MESSAGE_TYPES,
    USER_TYPE,
} from '../types/web-socket-types';
import { databaseQueueInstance, redisCacheInstance } from '../services/init-services';
import DatabaseQueue from '../queue/DatabaseQueue';

dotenv.config();
const REDIS_URL = process.env.REDIS_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export default class WebsocketServer {
    private wss: WebSocketServer;
    private socket_mapping: Map<string, CustomWebSocket> = new Map(); // Map<ws.id, ws>
    private session_participants_mapping: Map<string, Set<string>> = new Map(); // Map<live_session_id<Set<ws.id>>
    private session_spectators_mapping: Map<string, Set<string>> = new Map(); // Map<live_session_id<Set<ws.id>>
    private session_host_mapping: Map<string, string> = new Map(); // Map<live_session_id, ws.id>
    private publisher: Redis;
    private subscriber: Redis;
    private redis_cache: RedisCache;
    private database_queue: DatabaseQueue;

    private hostManager!: HostManager;
    private quizManager!: QuizManager;
    private participant_manager!: ParticipantManager;
    private spectator_manager!: SpectatorManager;

    constructor(server: Server) {
        this.wss = new WebSocketServer({ server });
        this.subscriber = new Redis(REDIS_URL!);
        this.publisher = new Redis(REDIS_URL!);
        this.redis_cache = redisCacheInstance;
        this.database_queue = databaseQueueInstance;
        this.initialize_redis_subscribers();
        this.initialize_managers();
        this.initialize();
    }

    private initialize_redis_subscribers() {
        this.subscriber.on('message', (channel: string, message: string) => {
            try {
                const parsed_subscriber_message = JSON.parse(message);
                this.handle_incoming_message_from_subscriber(channel, parsed_subscriber_message);
            } catch (err) {
                console.error('Error while handling redis message', err);
            }
        });
    }

    private handle_incoming_message_from_subscriber(channel: string, message: any) {
        const game_session_id = this.extract_session_id_from_channel(channel);
        if (!game_session_id) {
            console.error('Invalid game session id in channel', channel);
            return;
        }

        switch (message.type) {
            case MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION:
                this.broadcast_to_session(game_session_id, message, [
                    USER_TYPE.PARTICIPANT,
                    USER_TYPE.HOST,
                    USER_TYPE.SPECTATOR,
                ]);
                break;
        }
    }

    private broadcast_to_session(game_session_id: string, message: any, messages_to: USER_TYPE[]) {
        if (messages_to.includes(USER_TYPE.HOST)) {
            const host_socket_id = this.session_host_mapping.get(game_session_id);
            if (host_socket_id) {
                const host_socket = this.socket_mapping.get(host_socket_id);

                if (host_socket && host_socket.readyState === WebSocket.OPEN) {
                    host_socket.send(JSON.stringify(message));
                }
            }
        }

        if (messages_to.includes(USER_TYPE.PARTICIPANT)) {
            const participant_socket_ids = this.session_participants_mapping.get(game_session_id);
            participant_socket_ids?.forEach((socket_id: string) => {
                const participant_socket = this.socket_mapping.get(socket_id);
                if (participant_socket && participant_socket.readyState === WebSocket.OPEN) {
                    participant_socket.send(JSON.stringify(message));
                }
            });
        }

        if (messages_to.includes(USER_TYPE.SPECTATOR)) {
            const spectator_socket_ids = this.session_spectators_mapping.get(game_session_id);
            spectator_socket_ids?.forEach((socket_id: string) => {
                const spectator_socket = this.socket_mapping.get(socket_id);
                if (spectator_socket && spectator_socket.readyState === WebSocket.OPEN) {
                    spectator_socket.send(JSON.stringify(message));
                }
            });
        }
    }

    private extract_session_id_from_channel(channel: string): string | null {
        const match = channel.match(/game_session:(.+)/);
        return match ? match[1]! : null;
    }

    private initialize_managers() {
        this.quizManager = new QuizManager({
            publisher: this.publisher,
            subscriber: this.subscriber,
            redis_cache: this.redis_cache,
        });
        this.hostManager = new HostManager({
            publisher: this.publisher,
            subscriber: this.subscriber,
            socketMapping: this.socket_mapping,
            sessionHostMapping: this.session_host_mapping,
            quizManager: this.quizManager,
        });
        this.participant_manager = new ParticipantManager({
            publisher: this.publisher,
            subscriber: this.subscriber,
            socket_mapping: this.socket_mapping,
            session_participants_mapping: this.session_participants_mapping,
            quizManager: this.quizManager,
            databaseQueue: this.database_queue,
        });
        this.spectator_manager = new SpectatorManager({
            publisher: this.publisher,
            subscriber: this.subscriber,
            socket_mapping: this.socket_mapping,
            session_spectator_mapping: this.session_spectators_mapping,
            quizManager: this.quizManager,
        });
    }

    private initialize() {
        this.wss.on('connection', (ws: CustomWebSocket, req) => {
            const url = new URL(req.url || '', `http://${req.headers.host}`);
            const quizId = url.searchParams.get('quizId');
            if (!quizId) {
                ws.close();
                return;
            }
            this.validate_connection(ws, req, quizId);
        });
    }

    private validate_connection(ws: CustomWebSocket, req: any, quizId: string) {
        const cookies = req.headers.cookie;
        if (!cookies) {
            ws.close();
            return false;
        }
        const parsedCookies = parse(cookies);
        const token = parsedCookies['token'];
        if (!token) {
            ws.close();
            return false;
        }
        this.extract_token(ws, token, quizId);
    }

    private async extract_token(ws: CustomWebSocket, token: string, quizId: string): Promise<void> {
        try {
            jwt.verify(token, JWT_SECRET!, async (err, decoded) => {
                if (err) {
                    console.error('Error while verifying [JWT_SOCKET]', err);
                    ws.close();
                    return;
                }
                const payload = decoded as CookiePayload;
                const redis_key: string = `game_session:${payload.gameSessionId}`;
                this.subscriber.subscribe(redis_key);

                if (payload.quizId !== quizId) {
                    console.error('Token validation failed');
                    ws.close();
                    return;
                }

                switch (payload.role) {
                    case USER_TYPE.HOST:
                        await this.hostManager.handle_connection(ws, payload as CookiePayload);
                        break;
                    case USER_TYPE.PARTICIPANT:
                        await this.participant_manager.handle_connection(
                            ws,
                            payload as CookiePayload,
                        );
                        break;
                    default:
                        ws.close();
                }
            });
        } catch (err) {
            console.error('Error while verifying [JWT_SOCKET]', err);
            ws.close();
        }
    }
}
