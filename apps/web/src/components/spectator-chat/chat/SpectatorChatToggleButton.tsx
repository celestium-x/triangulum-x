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
                onClick={onClick}
                className="bg-transparent hover:bg-transparent text-4xl hover:scale-105 transition-transform duration-300"
            >
                <RiMessage3Fill
                    className="text-neutral-400"
                    style={{ width: '28px', height: '28px' }}
                />
            </Button>
        </ToolTipComponent>
    );
}
