'use client';

import { Button } from '@/components/ui/button';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { JSX } from 'react';
import { RiMessage3Fill } from 'react-icons/ri';

interface ChatToggleButtonProps {
    onClick: () => void;
}

export default function SpectatorChatToggleButton({ onClick }: ChatToggleButtonProps): JSX.Element {
    return (
        <ToolTipComponent content="Chat with others">
            <Button
                variant="ghost"
                onClick={onClick}
                className="hover:scale-105 dark:hover:bg-transparent transition-all duration-300"
            >
                <RiMessage3Fill style={{ width: '28px', height: '28px' }} />
            </Button>
        </ToolTipComponent>
    );
}
