import { Button } from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { cn } from '@/lib/utils';
import { useLiveQuizExpandableCardForHostStore } from '@/store/live-quiz/useLiveQuizExpandableCardForHostStore';
import {
    ChatMessageType,
    ChatReactionType,
    MESSAGE_TYPES,
    ReactorType,
} from '@/types/web-socket-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BiExpandAlt } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { MdChevronRight } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { useLiveQuizGlobalChatStore } from '@/store/live-quiz/useLiveQuizGlobalChatStore';
import { useLiveHostStore } from '@/store/live-quiz/useLiveQuizUserStore';
import { IoClose } from 'react-icons/io5';
import MessagesRenderer from '../common/MessageRenderer';

export default function HostChatsPanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForHostStore();
    const { hostData } = useLiveHostStore();
    const {
        subscribeToHandler,
        unsubscribeToHandler,
        handleSendChatMessage,
        handleSendChatReactionMessage,
    } = useWebSocket();
    const [_reactionAppear, setReactionAppear] = useState<boolean>(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [selectedReply, setSelectedReply] = useState<ChatMessageType | null>(null);
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
            if (chat.senderId === hostData?.id) return;
            addChatMessage(chat);
        },
        [hostData?.id, addChatMessage],
    );

    const handleIncomingChatReaction = useCallback(
        (payload: unknown) => {
            // this is not same as spectator, mark it once
            const reactionPayload = payload as ChatReactionType;
            const reaction = reactionPayload;

            if (reaction.reactorName === hostData?.name && reaction.reactorType === 'HOST') return;
            addChatReaction(reaction);
        },
        [hostData?.name, addChatReaction],
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
        if (!inputRef.current || !hostData) return;
        const message = inputRef.current.value.trim();
        if (!message) return;

        const chat: ChatMessageType = {
            id: uuid(),
            senderId: hostData.id,
            senderName: hostData.name,
            senderAvatar: hostData.image,
            message,
            createdAt: new Date(Date.now()),
            repliedToId: selectedReply?.id,
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
                        // check it once
                        id={hostData?.id || ''}
                        onSendReaction={(chatMessageId, reaction) => {
                            if (!hostData) return;
                            const reactionData: ChatReactionType = {
                                chatMessageId,
                                reactorName: hostData.name!,
                                reactorAvatar: hostData.image!,
                                reaction,
                                reactedAt: new Date(),
                                reactorType: ReactorType.HOST,
                            };
                            addChatReaction(reactionData);
                            handleSendChatReactionMessage(reactionData);
                        }}
                        onDoubleClick={(message: ChatMessageType) => setSelectedReply(message)}
                        highlight={selectedReply}
                    />
                </div>

                <div
                    className={cn(
                        'h-fit w-full px-2 ',
                        'focus-within:ring-1 focus-within:border-ring focus-within:ring-ring/50 rounded-xl ',
                        'dark:bg-input/30',
                    )}
                >
                    {selectedReply && (
                        <div
                            className={cn(
                                'relative w-full rounded-xl mt-2 px-4 py-2 flex justify-start items-center border border-neutral-800 bg-neutral-900',
                                'dark:text-neutral-500',
                            )}
                        >
                            <div className="pr-10 truncate">{selectedReply.message}</div>
                            <div
                                className="bg-neutral-300 p-[1px] absolute right-2 rounded-full"
                                onClick={() => setSelectedReply(null)}
                            >
                                <IoClose className="text-black size-3" />
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center items-center gap-x-2">
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
                                    setSelectedReply(null);
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
        </div>
    );
}
