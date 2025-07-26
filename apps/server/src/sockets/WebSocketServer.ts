import { WebSocket, Server as WSServer } from 'ws';
import { Server } from 'http';
import Redis from 'ioredis';
const REDIS_URL = process.env.REDIS_URL;

export default class WebsocketServer {
    private wss: WSServer;
    private socket_mapping: Map<string, WebSocket> = new Map(); // Map<ws.id, ws>
    private session_participants_mapping: Map<string, Set<string>> = new Map(); // Map<live_session_id<Set<ws.id>>
    private session_spectators_mapping: Map<string, Set<string>> = new Map(); // Map<live_session_id<Set<ws.id>>
    private session_host_mapping: Map<string, string> = new Map(); // Map<live_session_id<ws.id>
    private publisher: Redis;
    private subscriber: Redis;

    constructor(server: Server) {
        this.wss = new WSServer({ server });
        this.initialize();
        this.subscriber = new Redis(REDIS_URL!);
        this.publisher = new Redis(REDIS_URL!);
    }

    private initialize() {
        this.wss.on('connection', (_ws: WebSocket, _req) => {});
        this.subscriber.on('message', (_data) => {});
    }
}
