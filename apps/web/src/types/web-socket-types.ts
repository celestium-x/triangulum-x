import { InteractionEnum } from './prisma-types';

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

export enum ReactorType {
    HOST = 'HOST',
    SPECTATOR = 'SPECTATOR',
}

export type ChatMessageType = {
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    createdAt: Date;
    senderAvatar?: string | null;
    repliedToId?: string;
    chatReactions: {
        chatMessageId: string;
        reactorName: string;
        reactorAvatar: string;
        reaction: InteractionEnum;
        reactedAt: Date;
        reactorType: ReactorType;
    }[];
};

export type ChatReactionType = {
    chatMessageId: string;
    reactorName: string;
    reactorAvatar: string;
    reaction: InteractionEnum;
    reactedAt: Date;
    reactorType: ReactorType;
};

export interface SpectatorNameChangeEvent {
    choosenNickname: string;
}
