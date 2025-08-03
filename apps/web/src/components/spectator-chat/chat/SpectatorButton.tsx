'use client';

import { Button } from '@/components/ui/button';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { PiDetectiveFill } from 'react-icons/pi';

interface SpectatorButtonProps {
    onClick: () => void;
}

export default function SpectatorButton({ onClick }: SpectatorButtonProps) {
    return (
        <ToolTipComponent content="People in Room">
            <Button
                variant="ghost"
                onClick={onClick}
                className="hover:scale-105 dark:hover:bg-transparent transition-all duration-300"
            >
                <PiDetectiveFill className="" style={{ width: '28px', height: '28px' }} />
            </Button>
        </ToolTipComponent>
    );
}
