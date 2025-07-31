'use client';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { HostScreenEnum } from '@/types/prisma-types';
import HostLobbyScreen from './HostLobbyScreen';

export default function HostMainScreen() {
    const { gameSession } = useLiveQuizStore();

    function renderHostScreenPanels() {
        switch (gameSession?.hostScreen) {
            case HostScreenEnum.LOBBY:
                return <HostLobbyScreen />;
        }
    }

    return <div className="h-full">{renderHostScreenPanels()}</div>;
}
