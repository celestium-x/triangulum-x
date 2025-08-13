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
    exclude_socket_id?: string;
}

export enum Interactions {
    THUMBS_UP = 'THUMBS_UP',
    DOLLAR = 'DOLLAR',
    BULB = 'BULB',
    HEART = 'HEART',
    SMILE = 'SMILE',
}

export enum ReactorType {
    HOST = 'HOST',
    SPECTATOR = 'SPECTATOR',
}

export enum MESSAGE_TYPES {
    HOST_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
    HOST_CHANGE_QUESTION_PREVIEW = 'HOST_CHANGE_QUESTION_PREVIEW',
    HOST_LAUNCH_QUESTION = 'HOST_LAUNCH_QUESTION',

    PARTICIPANT_JOIN_GAME_SESSION = 'PARTICIPANT_JOIN_GAME_SESSION',
    PARTICIPANT_NAME_CHANGE = 'PARTICIPANT_NAME_CHANGE',

    SPECTATOR_JOIN_GAME_SESSION = 'SPECTATOR_JOIN_GAME_SESSION',
    SPECTATOR_NAME_CHANGE = 'SPECTATOR_NAME_CHANGE',

    REACTION_EVENT = 'REACTION_EVENT',
    SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE',
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

export interface IncomingChatMessage {
    quizId: string;
    senderId: string;
    senderRole: string;
    senderName: string;
    senderAvatar: string;
    message: string;
    repliedToId?: string;
}

export interface IncomingChatReaction {
    chatMessageId: string;
    reactorName: string;
    reactorAvatar: string;
    reaction: Interactions;
    reactedAt: Date;
    reactorType: ReactorType;
}

export type ChatMessageType = {
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    createdAt: Date;
    senderAvatar?: string | null;
    chatReactions: {
        reactorName: string;
        reactorAvatar: string;
        reaction: Interactions;
        reactedAt: Date;
        reactorType: ReactorType;
    }[];
};
