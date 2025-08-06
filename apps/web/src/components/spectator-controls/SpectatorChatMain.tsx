'use client';

import SpectatorChatLeft from './SpectatorChatLeft';
import SpectatorActions from './SpectatorActions';
import { useState } from 'react';

export default function SpectatorChatMain() {
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    return (
        <div className="h-full w-full flex select-none">
            <SpectatorChatLeft isChatExpanded={isChatExpanded} />
            <SpectatorActions onChatExpandChange={setIsChatExpanded} />
        </div>
    );
}
