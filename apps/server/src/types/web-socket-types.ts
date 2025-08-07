import { WebSocket } from 'ws';

export interface CustomWebSocket extends WebSocket {
    id: string;
    user: CookiePayload;
}

export enum HostScreenEnum {
    LOBBY = 'LOBBY',
    QUESTION_PREVIEW = 'QUESTION_PREVIEW',
    QUESTION_ACTIVE = 'QUESTION_ACTIVE',
    QUESTION_RESULTS = 'QUESTION_RESULTS',
    LEADERBOARD = 'LEADERBOARD',
    FINAL_RESULTS = 'FINAL_RESULTS',
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
    exclude_socket_id?: string;
}

export enum MESSAGE_TYPES {
    HOST_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
    HOST_CHANGE_QUESTION_PREVIEW = 'HOST_CHANGE_QUESTION_PREVIEW',

    PARTICIPANT_JOIN_GAME_SESSION = 'PARTICIPANT_JOIN_GAME_SESSION',
    PARTICIPANT_NAME_CHANGE = 'PARTICIPANT_NAME_CHANGE',

    SPECTATOR_JOIN_GAME_SESSION = 'SPECTATOR_JOIN_GAME_SESSION',
    SPECTATOR_NAME_CHANGE = 'SPECTATOR_NAME_CHANGE',

    REACTION_EVENT = 'REACTION_EVENT',
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

export interface HostScreenChangeEvent {
    currentScreen: HostScreenEnum;
}
