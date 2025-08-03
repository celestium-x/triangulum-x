import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { ParticipantScreenEnum } from '@/types/prisma-types';
import ParticipantLobbyScreen from './ParticipantLobbyScreen';
import ParticipantMotivationScreen from './ParticipantMotivationScreen';
import ParticipantQuestionReadingScreen from './ParticipantQuestionReadingScreen';

export default function ParticipantMainScreen() {
    const { gameSession } = useLiveQuizStore();
    const screen: ParticipantScreenEnum = ParticipantScreenEnum.QUESTION_READING
    function renderHostScreenPanels() {
        switch (screen) {
            case ParticipantScreenEnum.LOBBY:
                return <ParticipantLobbyScreen />;
            case ParticipantScreenEnum.MOTIVATION:
                return <ParticipantMotivationScreen />;
            case ParticipantScreenEnum.QUESTION_READING:
                return <ParticipantQuestionReadingScreen />;
        }
    }
    return <div className="h-full">{renderHostScreenPanels()}</div>;
}
