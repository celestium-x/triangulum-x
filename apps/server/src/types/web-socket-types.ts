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

export interface ParticipantTokenPayload {
    participantId: string;
    quizId: string;
    gameSessionId: string;
    role: 'PARTICIPANT';
    tokenId: string;
    iat: number;
    exp: number;
}

export enum HOST_MESSAGE_TYPES {
    JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
}
