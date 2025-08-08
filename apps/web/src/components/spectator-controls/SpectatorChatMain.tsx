'use client';

import SpectatorLobbyLeft from './SpectatorChatLeft';
import SpectatorActions from './SpectatorActions';
import { useState } from 'react';

export default function SpectatorLobbyScreen() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <div className="h-full w-full flex select-none">
            <SpectatorLobbyLeft isChatExpanded={isExpanded} />
            <SpectatorActions
                onExpandChange={(value1: boolean, value2: boolean) =>
                    setIsExpanded(value1 || value2)
                }
            />
        </div>
    );
}
