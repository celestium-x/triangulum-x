import ToolTipComponent from '@/components/utility/TooltipComponent';
import { cn } from '@/lib/utils';
import { USER_TYPE } from '@/types/prisma-types';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface JoinQuizCodeTickerProps {
    code?: string;
    link?: string;
    user?: USER_TYPE;
    position?: 'r' | 'l' | 't' | 'b' | 'tr' | 'tl' | 'br' | 'bl' | 'center';
    copyCode?: string;
}

export default function JoinQuizCodeTicker({
    link,
    code,
    user = USER_TYPE.SPECTATOR,
    position = 't',
    copyCode,
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
        if (code) {
            navigator.clipboard.writeText(addHyphen(code));
            setCopied(true);
        } else if(copyCode) {
            navigator.clipboard.writeText(addHyphen(copyCode));
            setCopied(true);
        }
    }

    function copyLinkHandler() {
        if (!link) return;
        navigator.clipboard.writeText(link);
        setCopied(true);
    }

    function getPosition(): string {
        switch (position) {
            case 'r':
                return 'right-2 top-1/2 -translate-y-1/2';
            case 'l':
                return 'left-2 top-1/2 -translate-y-1/2';
            case 't':
                return 'top-2 left-1/2 -translate-x-1/2';
            case 'b':
                return 'bottom-2 left-1/2 -translate-x-1/2';
            case 'tr':
                return 'top-2 right-2';
            case 'tl':
                return 'top-2 left-2';
            case 'br':
                return 'bottom-2 right-2';
            case 'bl':
                return 'bottom-2 left-2';
            default:
                return 'top-1/2 left-1/2 -translate-1/2';
        }
    }

    function addHyphen(str: string): string {
        return str.match(/.{1,3}/g)?.join('-') ?? str;
    }

    return (
        <div
            className={cn(
                'bg-neutral-200 px-3 py-1.5 rounded-md font-light z-50',
                'flex items-center justify-center gap-x-2 cursor-pointer',
                'max-w-[90vw] flex-wrap text-center',
                'absolute',
                getPosition()
            )}
        >
            {user === USER_TYPE.SPECTATOR ? (
                <span className="text-sm text-dark-base">Spectators | Use code</span>
            ) : (
                <span className="text-sm text-dark-base">Copy it to join participants</span>
            )}
            <ToolTipComponent content={`The code lets your ${user === USER_TYPE.SPECTATOR ? 'audience join the presentation' : 'participants join the quiz'} and expires in 2 days`}>
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
                    <span>{code ? `${addHyphen(code)}` : 'Click to Copy'}</span>
                </div>
            </ToolTipComponent>
            {link && (
                <>
                    <span className="text-sm text-dark-base">or copy this </span>
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
                </>
            )}
        </div>
    );
}
