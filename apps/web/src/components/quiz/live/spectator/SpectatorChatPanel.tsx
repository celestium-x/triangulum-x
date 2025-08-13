import { Button } from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { cn } from '@/lib/utils';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForSpectatorStore';
import { InteractionEnum, SpectatorType } from '@/types/prisma-types';
import {
    ChatMessageType,
    ChatReactionType,
    MESSAGE_TYPES,
    ReactorType,
} from '@/types/web-socket-types';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineAddReaction } from 'react-icons/md';
import { BiExpandAlt } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdChevronRight } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { useLiveQuizGlobalChatStore } from '@/store/live-quiz/useLiveQuizGlobalChatStore';
import { useLiveSpectatorStore } from '@/store/live-quiz/useLiveQuizUserStore';

export default function SpectatorChatPanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    const { spectatorData } = useLiveSpectatorStore();
    const {
        subscribeToHandler,
        unsubscribeToHandler,
        handleSendChatMessage,
        handleSendChatReactionMessage,
    } = useWebSocket();
    const [_reactionAppear, setReactionAppear] = useState<boolean>(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { chatMessages, addChatMessage, addChatReaction } = useLiveQuizGlobalChatStore();

    const uniqueMessages = useMemo(() => {
        const seen = new Set<string>();
        const out: ChatMessageType[] = [];
        for (const m of chatMessages) {
            if (seen.has(m.id)) continue;
            seen.add(m.id);
            out.push(m);
        }
        return out;
    }, [chatMessages]);

    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
    }

    const handleIncomingChatMessage = useCallback(
        (payload: unknown) => {
            const messagePayload = payload as { id: string; payload: ChatMessageType };
            const chat = messagePayload.payload;
            if (chat.senderId === spectatorData?.id) return;
            addChatMessage(chat);
        },
        [spectatorData?.id, addChatMessage],
    );

    const handleIncomingChatReaction = useCallback(
        (payload: unknown) => {
            const reactionPayload = payload as { id: string; payload: ChatReactionType };
            const reaction = reactionPayload.payload;
            if (
                reaction.reactorName === spectatorData?.nickname &&
                reaction.reactorType === 'SPECTATOR'
            )
                return;
            addChatReaction(reaction);
        },
        [spectatorData?.nickname, addChatReaction],
    );

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.SEND_CHAT_MESSAGE, handleIncomingChatMessage);
        subscribeToHandler(MESSAGE_TYPES.REACTION_EVENT, handleIncomingChatReaction);

        return () => {
            unsubscribeToHandler(MESSAGE_TYPES.SEND_CHAT_MESSAGE, handleIncomingChatMessage);
            unsubscribeToHandler(MESSAGE_TYPES.REACTION_EVENT, handleIncomingChatReaction);
        };
    }, [
        subscribeToHandler,
        unsubscribeToHandler,
        handleIncomingChatMessage,
        handleIncomingChatReaction,
    ]);

    function handleSendMessage() {
        if (!inputRef.current || !spectatorData) return;
        const message = inputRef.current.value.trim();
        if (!message) return;

        const chat: ChatMessageType = {
            id: uuid(),
            senderId: spectatorData.id,
            senderName: spectatorData.nickname,
            senderAvatar: spectatorData.avatar!,
            message,
            createdAt: new Date(Date.now()),
            chatReactions: [],
        };

        addChatMessage(chat);
        handleSendChatMessage(chat);
        inputRef.current.value = '';
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-center px-7 py-4 border-b">
                <span className="text-sm dark:text-light-base text-dark-primary">Chat</span>
                <ToolTipComponent content="Click to expand">
                    <Button
                        className="text-dark-base dark:text-light-base cursor-pointer dark:bg-neutral-600/30"
                        variant={'ghost'}
                        onClick={handleToggleExpand}
                    >
                        <BiExpandAlt className="dark:text-light-base" strokeWidth={0.5} />
                    </Button>
                </ToolTipComponent>
            </div>

            <div className="relative h-fit w-full flex flex-col justify-end items-start p-2 overflow-y-auto custom-scrollbar">
                <div className="h-full w-full overflow-y-auto custom-scrollbar">
                    <MessagesRenderer
                        messages={uniqueMessages}
                        spectatorData={spectatorData!}
                        onSendReaction={(chatMessageId, reaction) => {
                            if (!spectatorData) return;
                            const reactionData: ChatReactionType = {
                                chatMessageId,
                                reactorName: spectatorData.nickname!,
                                reactorAvatar: spectatorData.avatar!,
                                reaction,
                                reactedAt: new Date(),
                                reactorType: ReactorType.SPECTATOR,
                            };
                            addChatReaction(reactionData);
                            handleSendChatReactionMessage(reactionData);
                        }}
                    />
                </div>

                <div
                    className={cn(
                        'w-full px-2 gap-x-2 flex justify-center items-center',
                        'focus-within:ring-1 focus-within:border-ring focus-within:ring-ring/50 rounded-xl',
                        'dark:bg-input/30',
                    )}
                >
                    <span
                        onClick={() => setReactionAppear((prev) => !prev)}
                        className="dark:text-neutral-200 rounded-full p-1.5 transition-colors duration-200"
                    >
                        <HiOutlineEmojiHappy className="size-4 dark:text-neutral-400 text-neutral-800 rounded-full cursor-pointer" />
                    </span>

                    <TextArea
                        autogrow
                        ref={inputRef}
                        className={cn(
                            'w-full min-h-10 max-h-40 overflow-y-auto resize-none',
                            'focus-visible:ring-0',
                            'bg-transparent dark:text-neutral-200 text-neutral-950 text-sm',
                        )}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />

                    <span className="dark:text-neutral-200 dark:hover:bg-neutral-950 rounded-full p-1.5 transition-colors duration-200">
                        <MdChevronRight
                            className="size-4 rounded-full"
                            onClick={handleSendMessage}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

function MessagesRenderer({
    messages,
    spectatorData,
    onSendReaction,
}: {
    messages: ChatMessageType[];
    spectatorData: SpectatorType;
    onSendReaction: (chatMessageId: string, reaction: InteractionEnum) => void;
}) {
    const [hoverMessage, setHoverMessage] = useState<string>('');
    const [activeReactionMessage, setActiveReactionMessage] = useState<string | null>(null);

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

    return (
        <div className="w-full p-3 pt-14 flex flex-col gap-y-3 relative">
            {messages.map((message) => {
                const isOwnMessage = message.senderId === spectatorData.id;
                const groupedReactions = groupReactionsByType(message.chatReactions ?? []);

                return (
                    <div key={message.id} className="flex flex-col gap-y-2 relative mb-2">
                        <div
                            className={cn(
                                'flex items-end gap-x-2 relative',
                                isOwnMessage ? 'flex-row-reverse' : 'flex-row',
                            )}
                            onMouseEnter={() => setHoverMessage(message.id)}
                            onMouseLeave={() => setHoverMessage('')}
                        >
                            <div className="w-[28px] h-[28px] rounded-full overflow-hidden flex-shrink-0">
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
                                        ([reactionType, data]) => (
                                            <ToolTipComponent
                                                key={reactionType}
                                                content={`${data.reactors.join(', ')} reacted`}
                                            >
                                                <div
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
                                            </ToolTipComponent>
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

function MessageBubble({
    message,
    colored,
    hovered,
    isOwnMessage,
    active,
    onToggle,
    closeOthers,
    onReact,
}: {
    message: string;
    colored: boolean;
    hovered: boolean;
    isOwnMessage: boolean;
    active: boolean;
    onToggle: () => void;
    closeOthers: () => void;
    onReact: (reaction: InteractionEnum) => void;
}) {
    return (
        <div
            className={cn(
                'relative px-3 py-2 break-words max-w-[75%] ',
                colored
                    ? 'bg-[#8e46f3] text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white',
                colored
                    ? 'rounded-l-xl rounded-tr-xl rounded-br-md'
                    : 'rounded-r-xl rounded-tl-xl rounded-bl-md',
                'shadow-sm',
            )}
        >
            <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message}</div>

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

export function Reactions({
    onReact,
    className,
}: {
    onReact: (reaction: InteractionEnum) => void;
    className?: string;
}) {
    const reactions = ['👍', '💲', '💡', '❤️', '😀'];
    const getReactionEnum = (emoji: string): InteractionEnum => {
        switch (emoji) {
            case '👍':
                return InteractionEnum.THUMBS_UP;
            case '💲':
                return InteractionEnum.DOLLAR;
            case '💡':
                return InteractionEnum.BULB;
            case '❤️':
                return InteractionEnum.HEART;
            case '😀':
                return InteractionEnum.SMILE;
            default:
                throw new Error(`Unknown emoji: ${emoji}`);
        }
    };

    return (
        <div
            className={cn(
                'absolute z-100 flex justify-center items-center gap-x-0.5 py-1 px-3 rounded-full border',
                'bg-white dark:bg-neutral-800 shadow-xl dark:border',
                'animate-in fade-in-0 zoom-in-95 duration-150',
                'whitespace-nowrap',
                className,
            )}
        >
            {reactions.map((reaction, index) => (
                <div
                    key={index}
                    className="cursor-pointer text-md hover:scale-110 transition-transform duration-150 px-1 py-0.5 rounded-full"
                    onClick={() => onReact(getReactionEnum(reaction))}
                >
                    {reaction}
                </div>
            ))}
        </div>
    );
}
