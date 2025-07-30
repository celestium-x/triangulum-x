import { WebSocket } from 'ws';

export interface CustomWebSocket extends WebSocket {
    id: string;
    user: CookiePayload;
}

export interface CookiePayload {
    userId: string;
    quizId: string;
    gameSessionId: string;
    role: 'PARTICIPANT' | 'HOST';
    tokenId: string;
    iat: number;
    exp: number;
}

export enum HOST_MESSAGE_TYPES {
    JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
}
