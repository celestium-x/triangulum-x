import { WebSocket } from 'ws';

export interface CustomWebSocket extends WebSocket {
    id: string;
    user: HostTokenPayload;
}

export interface HostTokenPayload {
    userId: string;
    quizId: string;
    gameSessionId: string;
    role: 'HOST';
    tokenId: string;
    iat: number;
    exp: number;
}
