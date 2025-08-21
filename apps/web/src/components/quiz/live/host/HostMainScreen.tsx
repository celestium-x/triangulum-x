'use client';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { HostScreenEnum, QuizPhaseEnum } from '@/types/prisma-types';
import LobbyScreen from './screens/LobbyScreen/HostLobbyScreen';
import HostQuestionPreviewScreen from './screens/QuestionPreviewScreen/HostQuestionPreviewScreen';
import HostMainFooter from './HostMainFooter';
import HostPanelRenderer from './controls/HostPanelRenderer';
import HostQuestionResultsScreen from './screens/QuestionResultsScreen/HostQuestionResultsScreen';
import HostQuestionActiveScreen from './screens/QuestionActiveScreen/HostQuestionActiveScreen';
import { useCallback, useEffect } from 'react';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { MESSAGE_TYPES } from '@/types/web-socket-types';
import HostQuestionReadingScreen from './screens/QuestionReadingScreen/HostQuestionReadingScreen';

export default function HostMainScreen() {
    const { gameSession, updateGameSession } = useLiveQuizStore();
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();

    const handleIncomingReadingPhase = useCallback((payload: unknown) => {
        const readingPhasePayload = payload as {
            currentQuestionIndex: number,
            currentQuestionId: string,
            questionTitle: string,
            phaseStartTime: number,
            phaseEndTime: number,
            currentPhase: QuizPhaseEnum,
            hostScreen: HostScreenEnum,
        };

        // console.log("Reading phase payload: ", readingPhasePayload);

        updateGameSession({
            hostScreen: readingPhasePayload.hostScreen,
            currentQuestionId: readingPhasePayload.currentQuestionId,
            currentQuestionIndex: readingPhasePayload.currentQuestionIndex,
            phaseStartTime: readingPhasePayload.phaseStartTime,
            phaseEndTime: readingPhasePayload.phaseEndTime
        });
    }, [updateGameSession]);

    const handleIncomingActivePhase = useCallback(
        (payload: unknown) => {
            const activePhasePayload = payload as {
                questionOptions: string[];
                hostScreen: HostScreenEnum;
                startTime: number;
                endTime: number;
            };

            // console.log("active phase payload: ", readingPhasePayload);

            updateGameSession({
                hostScreen: activePhasePayload.hostScreen,
            });
        },
        [updateGameSession],
    );

    const handleIncomingResultsPhase = useCallback(
        (payload: unknown) => {
            const resultsPhasePayload = payload as {
                scores: { participantId: string; score: number }[];
                hostScreen: HostScreenEnum;
                startTime: number;
            };

            // console.log("results phase payload: ", resultsPhasePayload);

            updateGameSession({
                hostScreen: resultsPhasePayload.hostScreen,
            });
        },
        [updateGameSession],
    );

    useEffect(() => {
        subscribeToHandler(
            MESSAGE_TYPES.QUESTION_READING_PHASE_TO_HOST,
            handleIncomingReadingPhase,
        );
        subscribeToHandler(MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_HOST, handleIncomingActivePhase);
        subscribeToHandler(
            MESSAGE_TYPES.QUESTION_RESULTS_PHASE_TO_HOST,
            handleIncomingResultsPhase,
        );

        return () => {
            unsubscribeToHandler(
                MESSAGE_TYPES.QUESTION_READING_PHASE_TO_HOST,
                handleIncomingReadingPhase,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_HOST,
                handleIncomingActivePhase,
            );
            unsubscribeToHandler(
                MESSAGE_TYPES.QUESTION_RESULTS_PHASE_TO_HOST,
                handleIncomingResultsPhase,
            );
        };
    }, [
        subscribeToHandler,
        unsubscribeToHandler,
        handleIncomingReadingPhase,
        handleIncomingActivePhase,
        handleIncomingResultsPhase,
    ]);

    function renderHostScreenPanels() {
        switch (gameSession?.hostScreen) {
            case HostScreenEnum.LOBBY:
                return <LobbyScreen />;

            case HostScreenEnum.QUESTION_PREVIEW:
                return <HostQuestionPreviewScreen />;

            case HostScreenEnum.QUESTION_READING:
                return <HostQuestionReadingScreen />;

            case HostScreenEnum.QUESTION_ACTIVE:
                return <HostQuestionActiveScreen />;

            case HostScreenEnum.QUESTION_RESULTS:
                return <HostQuestionResultsScreen />;
        }
    }

    return (
        <div className="h-full relative w-full flex">
            {renderHostScreenPanels()}
            <HostMainFooter />
            <HostPanelRenderer />
        </div>
    );
}
