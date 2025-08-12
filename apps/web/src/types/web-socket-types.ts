export enum MESSAGE_TYPES {
    HOST_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
    HOST_CHANGE_QUESTION_PREVIEW = 'HOST_CHANGE_QUESTION_PREVIEW',

    PARTICIPANT_JOIN_GAME_SESSION = 'PARTICIPANT_JOIN_GAME_SESSION',
    PARTICIPANT_NAME_CHANGE = 'PARTICIPANT_NAME_CHANGE',

    SPECTATOR_JOIN_GAME_SESSION = 'SPECTATOR_JOIN_GAME_SESSION',
    SPECTATOR_NAME_CHANGE = 'SPECTATOR_NAME_CHANGE',

    REACTION_EVENT = 'REACTION_EVENT',
    SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE',
}

export interface ParticipantNameChangeEvent {
    choosenNickname: string;
}

export enum Interactions {
    THUMBS_UP = 'THUMBS_UP',
    DOLLAR = 'DOLLAR',
    BULB = 'BULB',
    HEART = 'HEART',
    SMILE = 'SMILE',
}

export type ChatMessageType = {
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    createdAt: Date;
    senderAvatar?: string | null;
    chatReactions: {
        id: string;
        userId: string;
        reaction: Interactions[];
        reactedAt: number;
    }[];
};

export interface SpectatorNameChangeEvent {
    choosenNickname: string;
}
