import { WebSocket, Server as WSServer } from 'ws'
import { QuizType } from '../types/prisma-types';
import { Server } from 'http'

export default class WebsocketServer {
    private wss: WSServer;
    
    private socket_mapping: Map<string, WebSocket> = new Map(); // Map<ws.id, ws>
    private session_participants_mapping: Map<string, Set<string>> = new Map(); // Map<live_session_id<Set<ws.id>>
    private session_spectators_mapping: Map<string, Set<string>> = new Map(); // Map<live_session_id<Set<ws.id>>
    private session_host_mapping: Map<string, string> = new Map(); // Map<live_session_id<ws.id>

    constructor(server: Server) {
        this.wss = new WSServer({ server });
        this.initialize();
    }

    private initialize() {

    }
}


