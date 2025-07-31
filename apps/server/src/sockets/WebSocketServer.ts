import { WebSocketServer } from 'ws';
import { Server } from 'http';
import Redis from 'ioredis';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CookiePayload, CustomWebSocket, USER_TYPE } from '../types/web-socket-types';
import HostManager from './HostManager';
import QuizManager from './QuizManager';
import RedisCache from '../cache/RedisCache';
import { URL } from 'url';
import ParticipantManager from './ParticipantManager';
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

    private hostManager!: HostManager;
    private quizManager!: QuizManager;
    private participant_manager!: ParticipantManager;

    constructor(server: Server) {
        this.wss = new WebSocketServer({ server });
        this.subscriber = new Redis(REDIS_URL!);
        this.publisher = new Redis(REDIS_URL!);
        this.redis_cache = new RedisCache();
        this.initialize_managers();
        this.initialize();
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
