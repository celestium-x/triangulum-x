import SpectatorChatMain from '@/components/spectator-controls/SpectatorChatMain';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { SpectatorScreenEnum } from '@/types/prisma-types';

export default function SpectatorMainScreen() {
    const { gameSession } = useLiveQuizStore();

    function renderHostScreenPanels() {
        switch (gameSession?.spectatorScreen) {
            case SpectatorScreenEnum.LOBBY:
                return <SpectatorChatMain />;
        }
    }
    return (
        <div className="h-full">
            {renderHostScreenPanels()}
        </div>
    );
}
