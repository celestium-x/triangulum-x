'use client';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { HostScreenEnum } from '@/types/prisma-types';
import HostLobbyScreen from './HostLobbyScreen';
import HostQuestionPreviewScreen from './HostQuestionPreviewScreen';
import HostMainFooter from './HostMainFooter';
import HostPanelRenderer from './HostPanelRenderer';

export default function HostMainScreen() {
    const { gameSession } = useLiveQuizStore();

    function renderHostScreenPanels() {
        switch (gameSession?.hostScreen) {
            case HostScreenEnum.LOBBY:
                return <HostLobbyScreen />;
            case HostScreenEnum.QUESTION_PREVIEW:
                return <HostQuestionPreviewScreen />;
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
