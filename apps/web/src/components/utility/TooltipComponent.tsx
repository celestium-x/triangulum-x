import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';

interface ToolTipComponentProps {
    children: React.ReactNode;
    content: React.ReactNode;
    className?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export default function ToolTipComponent({
    children,
    className,
    content,
    side = 'bottom',
}: ToolTipComponentProps) {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className={className} side={side} sideOffset={5}>
                    <span>{content}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
