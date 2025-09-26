import { InteractionEnum } from './prisma-types';

export enum MESSAGE_TYPES {
    HOST_JOIN_GAME_SESSION = 'JOIN_GAME_SESSION',
    HOST_CHANGE_QUESTION_PREVIEW = 'HOST_CHANGE_QUESTION_PREVIEW',
    HOST_LAUNCH_QUESTION = 'HOST_LAUNCH_QUESTION',
    HOST_EMITS_HINT = 'HOST_EMITS_HINT',
    QUESTION_ALREADY_ASKED = 'QUESTION_ALREADY_ASKED',

    PARTICIPANT_JOIN_GAME_SESSION = 'PARTICIPANT_JOIN_GAME_SESSION',
    PARTICIPANT_NAME_CHANGE = 'PARTICIPANT_NAME_CHANGE',
    PARTICIPANT_RESPONSE_MESSAGE = 'PARTICIPANT_RESPONSE_MESSAGE',
    PARTICIPANT_RESPONDED_MESSAGE = 'PARTICIPANT_RESPONDED_MESSAGE',
    PARTICIPANT_LEAVE_GAME_SESSION = 'PARTICIPANT_LEAVE_GAME_SESSION',

    SPECTATOR_JOIN_GAME_SESSION = 'SPECTATOR_JOIN_GAME_SESSION',
    SPECTATOR_NAME_CHANGE = 'SPECTATOR_NAME_CHANGE',

    CHAT_REACTION_EVENT = 'CHAT_REACTION_EVENT',
    CHAT_MESSAGE = 'CHAT_MESSAGE',

    INTERACTION_EVENT = 'INTERACTION_EVENT',

    QUESTION_READING_PHASE_TO_PARTICIPANT = 'QUESTION_READING_PHASE_TO_PARTICIPANT',
    QUESTION_READING_PHASE_TO_SPECTATOR = 'QUESTION_READING_PHASE_TO_SPECTATOR',
    QUESTION_READING_PHASE_TO_HOST = 'QUESTION_READING_PHASE_TO_HOST',

    QUESTION_ACTIVE_PHASE_TO_PARTICIPANT = 'QUESTION_ACTIVE_PHASE_TO_PARTICIPANT',
    QUESTION_ACTIVE_PHASE_TO_SPECTATOR = 'QUESTION_ACTIVE_PHASE_TO_SPECTATOR',
    QUESTION_ACTIVE_PHASE_TO_HOST = 'QUESTION_ACTIVE_PHASE_TO_HOST',

    QUESTION_RESULTS_PHASE_TO_PARTICIPANT = 'QUESTION_RESULTS_PHASE_TO_PARTICIPANT',
    QUESTION_RESULTS_PHASE_TO_SPECTATOR = 'QUESTION_RESULTS_PHASE_TO_SPECTATOR',
    QUESTION_RESULTS_PHASE_TO_HOST = 'QUESTION_RESULTS_PHASE_TO_HOST',
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
