'use client';

import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { ParticipantScreenEnum } from '@/types/prisma-types';
import ParticipantLobbyScreen from './screens/LobbyScreen/ParticipantLobbyScreen';
import ParticipantMotivationScreen from './screens/QuestionMotivationScreen/ParticipantMotivationScreen';
import ParticipantQuestionReadingScreen from './screens/QuestionReadingScreen/ParticipantQuestionReadingScreen';
import ParticipantMainFooter from './ParticipantMainFooter';
import ParticipantPanelRenderer from './ParticipantChannelRenderer';
import ParticipantQuestionActiveScreen from './screens/QuestionActiveScreen/ParticipantQuestionActiveScreen';
import ParticipantQuestionResultsScreen from './screens/QuestionResultsScreen/ParticipantQuestionResultsScreen';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ParticipantMainScreen() {
    const { gameSession } = useLiveQuizStore();

    useEffect(() => {
        function checkKeyPress(e: KeyboardEvent) {
            if (
                e.key === 'Escape' ||
                e.key === 'Tab' ||
                e.key === 'Shift' ||
                e.key === 'Control' ||
                e.key === 'Meta'
            ) {
                e.preventDefault();
                toast.error(`Key press: ${e.key}`);
            }
        }

        document.addEventListener('keydown', checkKeyPress);
        return () => {
            document.removeEventListener('keydown', checkKeyPress);
        };
    }, []);

    useEffect(() => {
        function handleChange() {
            if (!document.fullscreenElement) {
                // user escaped fullscreen
                toast.error('You exited fullscreen!');
                // optional: force leave the quiz
                // router.back();
            }
        }
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

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
                return <ParticipantQuestionResultsScreen />;
        }
    }
    return (
        <div className="h-full relative w-full flex z-20">
            {renderHostScreenPanels()}
            <ParticipantMainFooter />
            <ParticipantPanelRenderer />
        </div>
    );
}
