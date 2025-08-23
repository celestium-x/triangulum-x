"use client";

import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { ParticipantScreenEnum } from '@/types/prisma-types';
import ParticipantLobbyScreen from './screens/LobbyScreen/ParticipantLobbyScreen';
import ParticipantMotivationScreen from './screens/QuestionMotivationScreen/ParticipantMotivationScreen';
import ParticipantQuestionReadingScreen from './screens/QuestionReadingScreen/ParticipantQuestionReadingScreen';
import ParticipantMainFooter from './ParticipantMainFooter';
import ParticipantPanelRenderer from './ParticipantChannelRenderer';
import ParticipantQuestionActiveScreen from './screens/QuestionActiveScreen/ParticipantQuestionActiveScreen';
import { useEffect } from 'react';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { MESSAGE_TYPES } from '@/types/web-socket-types';
import { SubscribeEventHandlers } from '@/lib/subscribe-event-handlers';

export default function ParticipantMainScreen() {
    const { gameSession } = useLiveQuizStore();
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();

    useEffect(() => {
        subscribeToHandler(
            MESSAGE_TYPES.QUESTION_READING_PHASE_TO_PARTICIPANT,
            SubscribeEventHandlers.handleParticipantIncomingReadingPhase,
        );

        subscribeToHandler(
            MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_PARTICIPANT,
            SubscribeEventHandlers.handleParticipantIncomingActivePhase,
        );

        subscribeToHandler(
            MESSAGE_TYPES.QUESTION_RESULTS_PHASE_TO_PARTICIPANT,
            SubscribeEventHandlers.handleParticipantIncomingResultsPhase,
        );

        return () => {
            unsubscribeToHandler(
                MESSAGE_TYPES.QUESTION_READING_PHASE_TO_PARTICIPANT,
                SubscribeEventHandlers.handleParticipantIncomingReadingPhase,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_PARTICIPANT,
                SubscribeEventHandlers.handleParticipantIncomingActivePhase,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.QUESTION_RESULTS_PHASE_TO_PARTICIPANT,
                SubscribeEventHandlers.handleParticipantIncomingResultsPhase,
            );
        }
    }, [
        subscribeToHandler,
        unsubscribeToHandler
    ]);

    function renderHostScreenPanels() {
        switch (gameSession?.participantScreen) {
            case ParticipantScreenEnum.LOBBY:
                return <ParticipantLobbyScreen />;

            case ParticipantScreenEnum.QUESTION_MOTIVATION:
                return <ParticipantMotivationScreen />;

            case ParticipantScreenEnum.QUESTION_READING:
                return <ParticipantQuestionReadingScreen />;

            case ParticipantScreenEnum.QUESTION_ACTIVE:
                return <ParticipantQuestionActiveScreen />;

            case ParticipantScreenEnum.QUESTION_RESULTS:
                return <div>Question results</div>;
        }
    }
    return (
        <div className="h-full relative w-full flex">
            {renderHostScreenPanels()}
            <ParticipantMainFooter />
            <ParticipantPanelRenderer />
        </div>
    );
}
