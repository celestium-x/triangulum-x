import MessageBubble from '@/components/ui/MessageBubble';
import { cn } from '@/lib/utils';
import { InteractionEnum } from '@/types/prisma-types';
import { ChatMessageType, ChatReactionType } from '@/types/web-socket-types';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';

export default function MessagesRenderer({
    messages,
    id,
    onSendReaction,
    onDoubleClick,
    highlight,
}: {
    messages: ChatMessageType[];
    id: string;
    onSendReaction: (chatMessageId: string, reaction: InteractionEnum) => void;
    onDoubleClick: (message: ChatMessageType) => void;
    highlight: ChatMessageType | null;
}) {
    const [hoverMessage, setHoverMessage] = useState<string>('');
    const [activeReactionMessage, setActiveReactionMessage] = useState<string | null>(null);

    const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const messageMap = useMemo(() => {
        return new Map(messages.map((m) => [m.id, m]));
    }, [messages]);

    const handleToggleReaction = (messageId: string) => {
        setActiveReactionMessage((prev) => (prev === messageId ? null : messageId));
    };

    const formatTime = (input: string | number | Date) => {
        const date = new Date(input);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const groupReactionsByType = (messageReactions: ChatReactionType[]) => {
        const grouped: Partial<Record<InteractionEnum, { count: number; reactors: string[] }>> = {};

        messageReactions.forEach((reaction) => {
            if (!grouped[reaction.reaction]) {
                grouped[reaction.reaction] = { count: 0, reactors: [] };
            }
            grouped[reaction.reaction]!.count++;
            grouped[reaction.reaction]!.reactors.push(reaction.reactorName);
        });

        return grouped;
    };

    const getEmojiForReaction = (reaction: InteractionEnum): string => {
        switch (reaction) {
            case InteractionEnum.THUMBS_UP:
                return '👍';
            case InteractionEnum.DOLLAR:
                return '💲';
            case InteractionEnum.BULB:
                return '💡';
            case InteractionEnum.HEART:
                return '❤️';
            case InteractionEnum.SMILE:
                return '😀';
            default:
                return '👍';
        }
    };

    //
    const scrollToMessage = (id: string) => {
        const el = messageRefs.current.get(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('transition-colors', 'duration-300', 'bg-gray-800', 'rounded-sm');
            setTimeout(() => el.classList.remove('bg-gray-800'), 1500);
        }
    };

    return (
        <div className="w-full p-3 pt-14 flex flex-col gap-y-3 relative">
            {messages.map((message) => {
                const isOwnMessage = message.senderId === id;
                const groupedReactions = groupReactionsByType(message.chatReactions ?? []);
                //
                const highlighted = highlight?.id === message.id;
                //
                const repliedMessage = message.repliedToId
                    ? messageMap.get(message.repliedToId)
                    : undefined;

                return (
                    <div key={message.id} className="flex flex-col gap-y-2 relative mb-2">
                        <div
                            //
                            ref={(el) => {
                                if (el) messageRefs.current.set(message.id, el);
                            }}
                            className={cn(
                                'flex items-end gap-x-2 relative',
                                isOwnMessage ? 'flex-row-reverse' : 'flex-row',
                                highlighted ? 'bg-neutral-950' : '',
                            )}
                            key={message.id}
                            onMouseEnter={() => setHoverMessage(message.id)}
                            onMouseLeave={() => setHoverMessage('')}
                            //
                            onDoubleClick={() => onDoubleClick(message)}
                        >
                            <div className="size-[28px] rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={message.senderAvatar || ''}
                                    alt={message.senderName}
                                    width={28}
                                    height={28}
                                    className="object-cover"
                                />
                            </div>

                            <MessageBubble
                                message={message.message}
                                colored={isOwnMessage}
                                hovered={message.id === hoverMessage}
                                isOwnMessage={isOwnMessage}
                                active={activeReactionMessage === message.id}
                                onToggle={() => handleToggleReaction(message.id)}
                                closeOthers={() => setActiveReactionMessage(null)}
                                onReact={(reaction) => onSendReaction(message.id, reaction)}
                                repliedMessage={repliedMessage}
                                scrollToMessage={scrollToMessage}
                            />

                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 self-end pb-1 flex-shrink-0">
                                {formatTime(new Date(message.createdAt))}
                            </div>

                            {Object.keys(groupedReactions).length > 0 && (
                                <div
                                    className={cn(
                                        'absolute flex flex-wrap -bottom-5',
                                        isOwnMessage
                                            ? 'justify-end right-10'
                                            : 'justify-start left-10',
                                    )}
                                >
                                    {Object.entries(groupedReactions).map(
                                        ([reactionType, data], index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'flex items-center gap-x-1 px-1.5 py-0.5 rounded-full text-xs',
                                                    'bg-neutral-100 dark:bg-neutral-900',
                                                    'hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors cursor-pointer',
                                                )}
                                            >
                                                <span className="text-sm">
                                                    {getEmojiForReaction(
                                                        reactionType as InteractionEnum,
                                                    )}
                                                </span>
                                                {data.count > 1 && (
                                                    <span className="text-neutral-600 dark:text-neutral-300 min-w-[8px]">
                                                        {data.count}
                                                    </span>
                                                )}
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
