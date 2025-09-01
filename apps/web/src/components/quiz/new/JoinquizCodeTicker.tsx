import ToolTipComponent from '@/components/utility/TooltipComponent';
import { cn } from '@/lib/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface JoinQuizCodeTickerProps {
    code?: string;
    spectatorLink?: string;
}

export default function JoinQuizCodeTicker({
    spectatorLink,
    code = '393729',
}: JoinQuizCodeTickerProps) {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied]);

    function copyCodeHandler() {
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopied(true);
    }

    function copyLinkHandler() {
        if (!spectatorLink) return;
        navigator.clipboard.writeText(spectatorLink);
        setCopied(true);
    }

    return (
        <div
            className={cn(
                'bg-neutral-200 px-3 py-1.5 rounded-md font-light z-50',
                'flex items-center justify-center gap-x-2 absolute top-2 -translate-x-1/2 left-1/2 cursor-pointer',
                'max-w-[90vw] flex-wrap text-center',
            )}
        >
            <span className="text-sm text-dark-base">Spectators | Use code</span>
            <ToolTipComponent content="The code lets your audience join the presentation and expires in 2 days">
                <div
                    onClick={copyCodeHandler}
                    className="bg-dark-base text-light-base py-0.5 px-2 rounded-sm tracking-widest flex items-center justify-center gap-x-1 group"
                >
                    {!copied ? (
                        <CopyIcon
                            className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                            size={12}
                        />
                    ) : (
                        <CheckIcon
                            className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                            size={12}
                        />
                    )}
                    <span>{code}</span>
                </div>
            </ToolTipComponent>
            <span className="text-sm text-dark-base">or copy this </span>
            {spectatorLink && (
                <ToolTipComponent content="Share this link with your spectators">
                    <div
                        onClick={copyLinkHandler}
                        className="bg-dark-base text-light-base py-0.5 px-2 rounded-sm tracking-widest flex items-center justify-center gap-x-1 group"
                    >
                        {!copied ? (
                            <CopyIcon
                                className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                                size={12}
                            />
                        ) : (
                            <CheckIcon
                                className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden"
                                size={12}
                            />
                        )}
                        <span>link</span>
                    </div>
                </ToolTipComponent>
            )}
        </div>
    );
}
