import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { ChatMessageType, ChatReactionType, MESSAGE_TYPES } from '@/types/web-socket-types';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import { GameSessionType, ParticipantType, SpectatorType } from '@/types/prisma-types';
import {
    useLiveParticipantStore,
    useLiveSpectatorStore,
} from '@/store/live-quiz/useLiveQuizUserStore';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useLiveSpectatorsStore } from '@/store/live-quiz/useLiveSpectatorsStore';
import { useLiveQuizGlobalChatStore } from '@/store/live-quiz/useLiveQuizGlobalChatStore';

export const useSubscribeEventHandlers = () => {
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();
    const { upsertParticipant } = useLiveParticipantsStore();
    const { updateParticipantData } = useLiveParticipantStore();
    const { updateGameSession } = useLiveQuizStore();
    const { updateSpectatorData, spectatorData } = useLiveSpectatorStore();
    const { upsertSpectator } = useLiveSpectatorsStore();
    const { addChatReaction, addChatMessage } = useLiveQuizGlobalChatStore();

    function handleIncomingMessage(payload: unknown) {
        upsertParticipant(payload as ParticipantType);
    }

    function handleIncomingNameChangeMessage(payload: unknown) {
        const message = payload as ParticipantType;
        upsertParticipant({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as ParticipantType);
        updateParticipantData({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as ParticipantType);
    }

    function handleIncomingQuestionPreviewPageChange(payload: unknown) {
        const message = payload as GameSessionType;
        updateGameSession({ id: message.id, hostScreen: message.hostScreen } as GameSessionType);
    }

    function handleIncomingNewSpectator(payload: unknown) {
        upsertSpectator(payload as SpectatorType);
    }

    function handleIncomingSpectatorNameChangeMessage(payload: unknown) {
        const message = payload as SpectatorType;
        upsertSpectator({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as SpectatorType);
        updateSpectatorData({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as SpectatorType);
    }

    function handleIncomingChatReactionMessage(payload: unknown) {
        const message = payload as ChatReactionType;
        addChatReaction(message);
    }

    function handleHostLaunchQuestion() {}

    function handleIncomingChatMessage(payload: unknown) {
        const messagePayload = payload as { id: string; payload: ChatMessageType };
        const chat = messagePayload.payload;
        if (chat.senderId === spectatorData?.id) return;
        addChatMessage(chat);
    }

    function handleIncomingReactionEvent(payload: unknown) {
        const reactionPayload = payload as { id: string; payload: ChatReactionType };
        const reaction = reactionPayload.payload;
        if (
            reaction.reactorName === spectatorData?.nickname &&
            reaction.reactorType === 'SPECTATOR'
        )
            return;
        addChatReaction(reaction);
    }

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE, handleIncomingNameChangeMessage);
        subscribeToHandler(MESSAGE_TYPES.CHAT_MESSAGE, handleIncomingChatMessage);
        subscribeToHandler(MESSAGE_TYPES.CHAT_REACTION_EVENT, handleIncomingReactionEvent);

        subscribeToHandler(
            MESSAGE_TYPES.SPECTATOR_NAME_CHANGE,
            handleIncomingSpectatorNameChangeMessage,
        );
        subscribeToHandler(MESSAGE_TYPES.SPECTATOR_JOIN_GAME_SESSION, handleIncomingNewSpectator);
        subscribeToHandler(MESSAGE_TYPES.CHAT_REACTION_EVENT, handleIncomingChatReactionMessage);

        subscribeToHandler(
            MESSAGE_TYPES.HOST_CHANGE_QUESTION_PREVIEW,
            handleIncomingQuestionPreviewPageChange,
        );
        subscribeToHandler(MESSAGE_TYPES.HOST_LAUNCH_QUESTION, handleHostLaunchQuestion);

        return () => {
            unsubscribeToHandler(
                MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION,
                handleIncomingMessage,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE,
                handleIncomingNameChangeMessage,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.CHAT_REACTION_EVENT,
                handleIncomingChatReactionMessage,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.SPECTATOR_NAME_CHANGE,
                handleIncomingSpectatorNameChangeMessage,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.SPECTATOR_JOIN_GAME_SESSION,
                handleIncomingNewSpectator,
            );
            unsubscribeToHandler(MESSAGE_TYPES.HOST_LAUNCH_QUESTION, handleHostLaunchQuestion);
            unsubscribeToHandler(
                MESSAGE_TYPES.HOST_CHANGE_QUESTION_PREVIEW,
                handleIncomingQuestionPreviewPageChange,
            );
            unsubscribeToHandler(MESSAGE_TYPES.CHAT_MESSAGE, handleIncomingChatMessage);
            unsubscribeToHandler(MESSAGE_TYPES.CHAT_REACTION_EVENT, handleIncomingReactionEvent);
        };
    });
};
