import { WebSocket } from 'ws';

export interface CustomWebSocket extends WebSocket {
    id: string;
    user: CookiePayload;
}

export interface CookiePayload {
    userId: string;
    quizId: string;
    gameSessionId: string;
    role: USER_TYPE;
    tokenId: string;
    iat: number;
    exp: number;
}

export enum HOST_MESSAGE_TYPES {
    HOST_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
}

export enum PARTICIPANT_MESSAGE_TYPES {
    PARTICIPANT_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
}

export enum SPECTATOR_MESSAGE_TYPES {
    SPECTATOR_JOIN_GAME_SESSION = "JOIN_GAME_SESSION"
}

export enum USER_TYPE {
    HOST = 'HOST',
    PARTICIPANT = 'PARTICIPANT',
    SPECTATOR = 'SPECTATOR',
}
