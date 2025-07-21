import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"


interface ToolTipComponentProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

export default function ToolTipComponent({ children, content }: ToolTipComponentProps) {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                    <span>{content}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}