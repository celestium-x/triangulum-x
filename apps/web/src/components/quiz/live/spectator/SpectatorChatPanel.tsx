import { Button } from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { cn } from '@/lib/utils';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForSpectatorStore';
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
import { useLiveSpectatorStore } from '@/store/live-quiz/useLiveQuizUserStore';
import { IoClose } from 'react-icons/io5';
import MessagesRenderer from '../common/MessageRenderer';

const emojiList = ['😀', '😂', '😍', '👍', '🙏', '🔥', '🎉', '💡', '❤️', '😎'];

export default function SpectatorChatPanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    const { spectatorData } = useLiveSpectatorStore();
    const {
        subscribeToHandler,
        unsubscribeToHandler,
        handleSendChatMessage,
        handleSendChatReactionMessage,
    } = useWebSocket();
    const [reactionAppear, setReactionAppear] = useState<boolean>(false);
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

    const handleToggleExpand = () => setIsExpanded(!isExpanded);

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

    const handleSendMessage = () => {
        if (!inputRef.current || !spectatorData) return;
        const message = inputRef.current.value.trim();
        if (!message) return;

        const chat: ChatMessageType = {
            id: uuid(),
            senderId: spectatorData.id,
            senderName: spectatorData.nickname,
            senderAvatar: spectatorData.avatar!,
            message,
            createdAt: new Date(),
            repliedToId: selectedReply?.id,
            chatReactions: [],
        };

        addChatMessage(chat);
        handleSendChatMessage(chat);
        inputRef.current.value = '';
    };

    const handleAddEmoji = (emoji: string) => {
        if (!inputRef.current) return;
        const cursorPos = inputRef.current.selectionStart ?? inputRef.current.value.length;
        const textBefore = inputRef.current.value.substring(0, cursorPos);
        const textAfter = inputRef.current.value.substring(cursorPos);
        inputRef.current.value = textBefore + emoji + textAfter;
        inputRef.current.focus();
        setReactionAppear(false);
    };

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-center px-7 py-4 border-b">
                <span className="text-sm dark:text-light-base text-dark-primary">Chat</span>
                <ToolTipComponent content="Click to expand">
                    <Button
                        className="text-dark-base dark:text-light-base cursor-pointer dark:bg-neutral-600/30"
                        variant="ghost"
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
                        id={spectatorData?.id || ''}
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
                        onDoubleClick={(message: ChatMessageType) => setSelectedReply(message)}
                        highlight={selectedReply}
                    />
                </div>

                <div
                    className={cn(
                        'h-fit w-full px-2 ',
                        'focus-within:ring-1 focus-within:border-ring focus-within:ring-ring/50 rounded-xl ',
                        'dark:bg-input/30',
                        'relative',
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

                    <div className="flex justify-center items-center gap-x-2 relative">
                        {reactionAppear && (
                            <div className="absolute max-w-[10rem] bottom-11 left-0 z-50 bg-white dark:bg-neutral-800 p-2 rounded-xl shadow-lg border flex gap-2 overflow-x-auto flex-nowrap custom-scrollbar">
                                {emojiList.map((emoji) => (
                                    <span
                                        key={emoji}
                                        className="cursor-pointer text-lg hover:scale-110 transition-transform"
                                        onClick={() => handleAddEmoji(emoji)}
                                    >
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        )}

                        <span
                            onClick={() => setReactionAppear((prev) => !prev)}
                            className="dark:text-neutral-200 rounded-full p-1.5 transition-colors duration-200 cursor-pointer"
                        >
                            <HiOutlineEmojiHappy className="size-4 dark:text-neutral-400 text-neutral-800 rounded-full" />
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
                                    setSelectedReply(null);
                                    handleSendMessage();
                                }
                            }}
                        />
                        <span className="dark:text-neutral-200 dark:hover:bg-neutral-950 rounded-full p-1.5 transition-colors duration-200 cursor-pointer">
                            <MdChevronRight
                                className="size-4 rounded-full"
                                onClick={handleSendMessage}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
