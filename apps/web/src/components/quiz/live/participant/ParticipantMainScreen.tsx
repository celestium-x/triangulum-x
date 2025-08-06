import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { ParticipantScreenEnum } from '@/types/prisma-types';
import ParticipantLobbyScreen from './ParticipantLobbyScreen';
import ParticipantMotivationScreen from './ParticipantMotivationScreen';
import ParticipantQuestionReadingScreen from './ParticipantQuestionReadingScreen';
import ParticipantMainFooter from './ParticipantMainFooter';
import ParticipantPanelRenderer from './ParticipantChannelRenderer';

export default function ParticipantMainScreen() {
    const { gameSession } = useLiveQuizStore();
    function renderHostScreenPanels() {
        switch (gameSession?.participantScreen) {
            case ParticipantScreenEnum.LOBBY:
                return <ParticipantLobbyScreen />;
            case ParticipantScreenEnum.MOTIVATION:
                return <ParticipantMotivationScreen />;
            case ParticipantScreenEnum.QUESTION_READING:
                return <ParticipantQuestionReadingScreen />;
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
