import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { MESSAGE_TYPES } from '@/types/web-socket-types';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import { ParticipantType } from '@/types/prisma-types';

export const useSubscribeEventHandlers = () => {
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();
    const { upsertParticipant } = useLiveParticipantsStore();
    function handleIncomingMessage(payload: unknown) {
        upsertParticipant(payload as ParticipantType);
    }

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        return () => {
            unsubscribeToHandler(
                MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION,
                handleIncomingMessage,
            );
        };
    });
};
