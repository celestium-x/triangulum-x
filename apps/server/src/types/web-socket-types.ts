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

export interface PubSubMessageTypes {
    type: MESSAGE_TYPES;
    payload: any;
}

export enum MESSAGE_TYPES {
    HOST_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
    PARTICIPANT_JOIN_GAME_SESSION = 'PARTICIPANT_JOIN_GAME_SESSION',
    PARTICIPANT_NAME_CHANGE = 'PARTICIPANT_NAME_CHANGE',
    PARTICIPANT_LEAVE_GAME_SESSION = 'PARTICIPANT_LEAVE_GAME_SESSION',
    SPECTATOR_JOIN_GAME_SESSION = 'SPECTATOR_JOIN_GAME_SESSION',
    SPECTATOR_SEND_MESSAGE = 'SPECTATOR_SEND_MESSAGE',
    SPECTATOR_NAME_CHANGE = 'SPECTATOR_NAME_CHANGE',
    SPECTATOR_LEAVE_GAME_SESSION = 'SPECTATOR_LEAVE_GAME_SESSION',
}

export enum USER_TYPE {
    HOST = 'HOST',
    PARTICIPANT = 'PARTICIPANT',
    SPECTATOR = 'SPECTATOR',
}

export interface ParticipantNameChangeEvent {
    choosenNickname: string;
}

export interface SpectatorNameChangeEvent {
    choosenNickname: string;
}
