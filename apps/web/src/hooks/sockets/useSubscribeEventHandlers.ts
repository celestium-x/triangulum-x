import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { MESSAGE_TYPES } from '@/types/web-socket-types';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import { ParticipantType } from '@/types/prisma-types';
import { useLiveParticipantStore } from '@/store/live-quiz/useLiveQuizUserStore';

export const useSubscribeEventHandlers = () => {
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();
    const { upsertParticipant } = useLiveParticipantsStore();
    const { updateParticipantData } = useLiveParticipantStore();
    function handleIncomingMessage(payload: unknown) {
        upsertParticipant(payload as ParticipantType);
    }

    function handleIncomingNameChangeMessage(payload: unknown) {
        const message = payload as ParticipantType;
        upsertParticipant({ id: message.id, nickname: message.nickname } as ParticipantType);
        updateParticipantData({ id: message.id, nickname: message.nickname } as ParticipantType);
    }

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE, handleIncomingNameChangeMessage);
        return () => {
            unsubscribeToHandler(
                MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION,
                handleIncomingMessage,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.PARTICIPANT_NAME_CHANGE,
                handleIncomingNameChangeMessage,
            );
        };
    });
};
