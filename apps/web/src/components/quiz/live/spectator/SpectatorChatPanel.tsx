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
import { MdOutlineAddReaction } from "react-icons/md";
import { BiExpandAlt } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdChevronRight } from 'react-icons/md';
import { v4 as uuid } from 'uuid';

export default function SpectatorChatPanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    const { spectatorData } = useLiveSpectatorStore();
    const { subscribeToHandler, unsubscribeToHandler, handleSendChatMessage } = useWebSocket();

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
    }

    const handleIncomingChatMessage = useCallback((payload: unknown) => {
        const messagePayload = payload as { id: string; payload: ChatMessage };
        const chat = messagePayload.payload;
        if (chat.sender_id === spectatorData?.id) {
            return;
        }
        setMessages((prev) => [...prev, chat]);
    }, []);

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
            <div className="relative h-fit w-full flex flex-col justify-end items-start p-2 overflow-y-auto">
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
                    <HiOutlineEmojiHappy className="size-7 p-1 hover:bg-neutral-900 rounded-full cursor-pointer " />
                    <TextArea
                        autogrow
                        ref={inputRef}
                        className={cn(
                            'w-full min-h-10 max-h-40 overflow-y-auto resize-none border-none ',
                            'py-2 px-1',
                            'focus-visible:ring-0',
                            'bg-transparent',
                        )}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <MdChevronRight
                        className="size-7 p-1 hover:bg-neutral-900 rounded-full cursor-pointer"
                        onClick={handleSendMessage}
                    />
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

    return (
        <div className="w-full px-2 py-2 flex flex-col gap-y-2 ">
            {messages.map((message, index) => (
                <div
                    className={cn(
                        'flex items-center gap-x-1',
                        message.sender_id === spectatorData.id ? 'justify-end ' : 'justify-start ',
                    )}
                    key={index}
                    onMouseEnter={() => setHoverMessage(message.id)}
                    onMouseLeave={() => setHoverMessage('')}
                >
                    {message.sender_id !== spectatorData.id && (
                        <div className="size-[32px] rounded-full overflow-hidden ">
                            <Image
                                src={message.avatar}
                                alt={message.sender_name}
                                width={32}
                                height={32}
                            />
                        </div>
                    )}
                    <MessageBubble
                        message={message.message}
                        colored={message.sender_id === spectatorData.id}
                        hovered={message.id === hoverMessage}
                    />
                    {message.sender_id === spectatorData.id && (
                        <div className="size-[32px] rounded-full overflow-hidden ">
                            <Image
                                src={message.avatar}
                                alt={message.sender_name}
                                width={32}
                                height={32}
                            />
                        </div>
                    )}
                    {/* <Reactions
                    onReact={() => { }}
                /> */}
                </div>
            ))}
        </div>
    );
}

function MessageBubble({
    message,
    colored,
    hovered,
}: {
    message: string;
    colored: boolean;
    hovered: boolean;
}) {
    // const [react, setReact] = useState<boolean>(false);

    return (
        <div
            className={cn(
                'relative px-3 py-1 break-words max-w-[70%]', // limit to 70% of container width
                colored ? 'bg-[#8e46f3]' : 'bg-neutral-400',
                colored ? 'rounded-l-md rounded-tr-md' : 'rounded-r-md rounded-tl-md',
            )}
        >
            <div className="whitespace-pre-wrap break-words">{message}</div>

            {hovered && (
                <div
                    className={cn(
                        'absolute top-1/2 -translate-y-1/2',
                        colored ? 'left-0 -translate-x-2/3' : 'right-0 translate-x-2/3',
                        'flex justify-center items-center gap-x-0.5 dark:text-neutral-400 rounded-full cursor-pointer text-[10px]',
                    )}
                    onClick={() => { }}
                >
                    <MdOutlineAddReaction className="size-4" fill='white'/>
                </div>
            )}
            {/* {react && (

            )} */}
        </div>
    );
}

export function Reactions({ onReact }: { onReact: (reaction: InteractionEnum) => void }) {
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
        <div className="absolute flex justify-center items-center gap-x-2 p-2 rounded-md border ">
            {reactions.map((reaction, index) => (
                <div
                    key={index}
                    className="cursor-pointer text-base "
                    onClick={() => onReact(getReactionEnum(reaction))}
                >
                    {reaction}
                </div>
            ))}
        </div>
    );
}
