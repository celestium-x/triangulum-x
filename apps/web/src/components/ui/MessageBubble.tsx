import { cn } from '@/lib/utils';
import { InteractionEnum } from '@/types/prisma-types';
import { ChatMessageType } from '@/types/web-socket-types';
import { MdOutlineAddReaction } from 'react-icons/md';
import Reactions from '../quiz/live/common/Reactions';

export default function MessageBubble({
    message,
    colored,
    hovered,
    isOwnMessage,
    active,
    onToggle,
    closeOthers,
    onReact,
    repliedMessage,
    scrollToMessage,
}: {
    message: string;
    colored: boolean;
    hovered: boolean;
    isOwnMessage: boolean;
    active: boolean;
    onToggle: () => void;
    closeOthers: () => void;
    onReact: (reaction: InteractionEnum) => void;
    repliedMessage?: ChatMessageType;
    scrollToMessage: (id: string) => void;
}) {
    return (
        <div
            className={cn(
                'relative px-2 py-2 break-words max-w-[75%] min-w-[60px] rounded-t-lg',
                colored
                    ? 'bg-[#8e46f3] text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white',
                colored ? 'rounded-l-lg rounded-br-xs ' : 'rounded-r-lg rounded-bl-xs ',
                'shadow-sm',
            )}
        >
            {repliedMessage && (
                <div
                    className={cn(
                        'w-full truncate text-sm text-neutral-300 rounded-sm px-2 py-1.5 cursor-pointer ',
                        colored ? 'bg-[#6231a7]' : 'bg-neutral-600',
                    )}
                    onClick={() => repliedMessage.id && scrollToMessage(repliedMessage.id)}
                >
                    {repliedMessage.message}
                </div>
            )}

            <div className="whitespace-pre-wrap break-words text-sm leading-relaxed px-1">
                {message}
            </div>

            {hovered && (
                <div
                    className={cn(
                        'absolute z-10 bg-black/80 text-white rounded-full p-1.5 cursor-pointer',
                        'hover:bg-black/90 transition-colors duration-150',
                        'shadow-lg backdrop-blur-sm',
                        isOwnMessage ? '-left-3 top-0' : '-right-3 top-0',
                        'transform -translate-y-1/2',
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                >
                    <MdOutlineAddReaction className="size-3.5" fill="white" />
                </div>
            )}

            {active && (
                <Reactions
                    className={cn(
                        'absolute z-20',
                        'bottom-full mb-1.5',
                        isOwnMessage ? 'right-full -mr-6' : 'left-full -ml-6',
                    )}
                    onReact={(reaction) => {
                        onReact(reaction);
                        closeOthers();
                    }}
                />
            )}
        </div>
    );
}
