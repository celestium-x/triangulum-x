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

export default function ParticipantMainScreen() {
    const { gameSession } = useLiveQuizStore();

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
        <div className="h-full relative w-full flex">
            {renderHostScreenPanels()}
            <ParticipantMainFooter />
            <ParticipantPanelRenderer />
        </div>
    );
}
