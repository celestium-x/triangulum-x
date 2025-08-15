import { cn } from '@/lib/utils';
import { InteractionEnum } from '@/types/prisma-types';
import { ChatMessageType } from '@/types/web-socket-types';
import { MdOutlineAddReaction } from 'react-icons/md';
import Reactions from '../quiz/live/common/Reactions';

export default function MessageBubble({
    message,
    messageCreatedAt,
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
    messageCreatedAt: Date;
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
    const formatTime = (input: string | number | Date) => {
        const date = new Date(input);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    return (
        <div
            className={cn('flex flex-col max-w-[75%]', isOwnMessage ? 'items-end' : 'items-start')}
        >
            <div
                className={cn(
                    'relative min-w-[35px] rounded-md px-3 py-2',
                    colored
                        ? 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white rounded-xl'
                        : 'bg-[#8e46f3] text-white',
                    isOwnMessage ? 'rounded-br-none' : 'rounded-bl-none',
                    'shadow-md transition-all duration-200 ease-in-out',
                )}
            >
                {repliedMessage && (
                    <div
                        className={cn(
                            'w-full flex flex-col gap-1 text-sm rounded-md px-2 py-1 mb-2 border-l-4',
                            colored
                                ? 'bg-neutral-800/70 border-neutral-400'
                                : 'bg-[#6b38c6] border-[#be92ff]',
                            'cursor-pointer hover:brightness-95 transition-all duration-150',
                        )}
                        onClick={() => repliedMessage.id && scrollToMessage(repliedMessage.id)}
                    >
                        <span className="text-xs font-medium dark:text-neutral-100 text-neutral-900 truncate">
                            {repliedMessage.senderName.split(' ')[0]}
                        </span>
                        <span className="text-xs text-neutral-200 dark:text-neutral-300 truncate">
                            {repliedMessage.message}
                        </span>
                    </div>
                )}

                <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {message}
                </div>

                {hovered && (
                    <div
                        className={cn(
                            'absolute z-10 bg-black/70 text-white rounded-full p-1.5 cursor-pointer',
                            'hover:bg-black/80 transition-colors duration-150',
                            'shadow-lg backdrop-blur-sm',
                            isOwnMessage ? '-left-4 top-2' : '-right-4 top-2',
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                    >
                        <MdOutlineAddReaction className="size-4" fill="white" />
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

            <div
                className={cn(
                    'text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 px-1',
                    isOwnMessage ? 'text-right' : 'text-left',
                )}
            >
                {formatTime(new Date(messageCreatedAt))}
            </div>
        </div>
    );
}
