import SpectatorChatMain from '@/components/spectator-chat/SpectatorChatMain';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { SpectatorScreenEnum } from '@/types/prisma-types';
// import ParticipantLobbyScreen from './';

export default function ParticipantMainScreen() {
    const { gameSession } = useLiveQuizStore();

    function renderHostScreenPanels() {
        switch (gameSession?.spectatorScreen) {
            case SpectatorScreenEnum.LOBBY:
                return <SpectatorChatMain />;
        }
    }
    return <div className="h-full">{renderHostScreenPanels()}</div>;
}
