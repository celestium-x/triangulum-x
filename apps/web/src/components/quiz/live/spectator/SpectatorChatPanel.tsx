import { Button } from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { cn } from '@/lib/utils';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForSpectatorStore';
import { useLiveSpectatorStore } from '@/store/live-quiz/useLiveQuizUserStore';
import { InteractionEnum, SpectatorType } from '@/types/prisma-types';
import { ChatMessage, MESSAGE_TYPES } from '@/types/web-socket-types';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineAddReaction } from 'react-icons/md';
import { BiExpandAlt } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdChevronRight } from 'react-icons/md';
import { v4 as uuid } from 'uuid';

export default function SpectatorChatPanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    const { spectatorData } = useLiveSpectatorStore();
    const { subscribeToHandler, unsubscribeToHandler, handleSendChatMessage } = useWebSocket();
    const [_reactionAppear, setReactionAppear] = useState<boolean>(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
    }

    const handleIncomingChatMessage = useCallback(
        (payload: unknown) => {
            const messagePayload = payload as { id: string; payload: ChatMessage };
            const chat = messagePayload.payload;

            if (chat.sender_id === spectatorData?.id) return;

            setMessages((prev) => [...prev, chat]);
        },
        [spectatorData?.id],
    );

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.SEND_CHAT_MESSAGE, handleIncomingChatMessage);
        return () => {
            unsubscribeToHandler(MESSAGE_TYPES.SEND_CHAT_MESSAGE, handleIncomingChatMessage);
        };
    }, [subscribeToHandler, unsubscribeToHandler, handleIncomingChatMessage]);

    function handleSendMessage() {
        if (!inputRef.current || !spectatorData) return;

        const message = inputRef.current.value;

        if (message.length === 0) return;

        const chat: ChatMessage = {
            id: uuid(),
            sender_id: spectatorData.id,
            sender_name: spectatorData.nickname,
            avatar: spectatorData.avatar!,
            message: message,
            timestamp: Date.now(),
            chatReactions: [],
        };

        setMessages([...messages, chat]);
        handleSendChatMessage(chat);
        inputRef.current.value = '';
    }

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-center px-7 py-4 border-b">
                <span className="text-sm dark:text-light-base text-dark-primary">Chat</span>
                <ToolTipComponent content="Click to expand">
                    <div>
                        <Button
                            className="text-dark-base dark:text-light-base cursor-pointer dark:bg-neutral-600/30 "
                            variant={'ghost'}
                            onClick={handleToggleExpand}
                        >
                            <BiExpandAlt className="dark:text-light-base" strokeWidth={0.5} />
                        </Button>
                    </div>
                </ToolTipComponent>
            </div>
            <div className="relative h-fit w-full flex flex-col justify-end items-start p-2 overflow-y-auto custom-scrollbar">
                <div className="h-full w-full overflow-y-auto custom-scrollbar ">
                    <MessagesRenderer messages={messages} spectatorData={spectatorData!} />
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
                        className="dark:text-neutral-200  rounded-full p-1.5 transition-colors duration-200"
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
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <span className="dark:text-neutral-200 dark:hover:bg-neutral-950 rounded-full p-1.5 transition-colors duration-200">
                        <MdChevronRight
                            className="size-4 rounded-full "
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
}: {
    messages: ChatMessage[];
    spectatorData: SpectatorType;
}) {
    const [hoverMessage, setHoverMessage] = useState<string>('');
    const [activeReactionMessage, setActiveReactionMessage] = useState<string | null>(null);

    const handleToggleReaction = (messageId: string) => {
        setActiveReactionMessage((prev) => (prev === messageId ? null : messageId));
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    return (
        <div className="w-full px-3 py-3 flex flex-col gap-y-3 relative">
                {messages.map((message) => {
                const isOwnMessage = message.sender_id === spectatorData.id;

                return (
                    <div
                        className={cn(
                            'flex items-end gap-x-2',
                            isOwnMessage ? 'flex-row-reverse' : 'flex-row',
                        )}
                        key={message.id}
                        onMouseEnter={() => setHoverMessage(message.id)}
                        onMouseLeave={() => setHoverMessage('')}
                    >
                        <div className="size-[28px] rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={message.avatar}
                                alt={message.sender_name}
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
                        />

                        <div
                            className={cn(
                                'text-[10px] text-neutral-500 dark:text-neutral-400 self-end pb-1 flex-shrink-0',
                            )}
                        >
                            {formatTime(message.timestamp)}
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
}: {
    message: string;
    colored: boolean;
    hovered: boolean;
    isOwnMessage: boolean;
    active: boolean;
    onToggle: () => void;
    closeOthers: () => void;
}) {
    return (
        <div
            className={cn(
                'relative px-3 py-2 break-words max-w-[75%] min-w-[60px]',
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
                        'bottom-full mb-2',

                        isOwnMessage ? 'right-full mr-3' : 'left-full ml-3',
                    )}
                    onReact={(_reaction) => {
                        closeOthers();
                        // on react logic here
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
                'absolute z-[999] flex justify-center items-center gap-x-2 p-2 px-4 rounded-full border',
                'bg-white dark:bg-neutral-800 shadow-xl border-neutral-200 dark:border-neutral-600',
                'animate-in fade-in-0 zoom-in-95 duration-150',
                'whitespace-nowrap',
                className,
            )}
        >
            {reactions.map((reaction, index) => (
                <div
                    key={index}
                    className="cursor-pointer text-lg hover:scale-110 transition-transform duration-150 px-1 py-0.5 rounded-full"
                    onClick={() => onReact(getReactionEnum(reaction))}
                >
                    {reaction}
                </div>
            ))}
        </div>
    );
}
