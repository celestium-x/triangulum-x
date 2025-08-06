import SpectatorLobbyScreen from '@/components/spectator-controls/SpectatorLobbyScreen';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { SpectatorScreenEnum } from '@/types/prisma-types';
import SpectatorMainFooter from './SpectatorMainFooter';
import SpectatorPanelRenderer from './SpectatorPanelRenderer';

export default function SpectatorMainScreen() {
    const { gameSession } = useLiveQuizStore();

    function renderHostScreenPanels() {
        switch (gameSession?.spectatorScreen) {
            case SpectatorScreenEnum.LOBBY:
                return <SpectatorLobbyScreen />;
        }
    }
    return (
        <div className="h-full relative w-full flex">
            {renderHostScreenPanels()}
            <SpectatorMainFooter />
            <SpectatorPanelRenderer />
        </div>
    );
}
