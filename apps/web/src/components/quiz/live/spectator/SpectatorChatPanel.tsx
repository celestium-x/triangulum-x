import { Button } from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { cn } from '@/lib/utils';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForSpectatorStore';
import { useLiveSpectatorStore } from '@/store/live-quiz/useLiveQuizUserStore';
import { ChatMessage, MESSAGE_TYPES } from '@/types/web-socket-types';
import { useEffect, useRef, useState } from 'react';
import { BiExpandAlt } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { MdChevronRight } from "react-icons/md";
import { v4 as uuid } from "uuid";

export default function SpectatorChatPanel() {
    const { isExpanded, setIsExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    const { spectatorData } = useLiveSpectatorStore();
    const { subscribeToHandler, unsubscribeToHandler, handleSendChatMessage } = useWebSocket();

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    function handleToggleExpand() {
        setIsExpanded(!isExpanded);
    }

    function handleIncomingChatMessage(payload: any) {
        const chat: ChatMessage = payload.payload;
        setMessages([...messages, chat]);
    }

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.SEND_CHAT_MESSAGE, handleIncomingChatMessage);
        return () => {
            unsubscribeToHandler(MESSAGE_TYPES.SEND_CHAT_MESSAGE, handleIncomingChatMessage);
        }
    }, []);

    function handleSendMessage() {
        
        if(!inputRef.current || !spectatorData) return;

        const message = inputRef.current.value;

        const chat: ChatMessage = {
            id: uuid(),
            sender_id: spectatorData.id,
            sender_name: spectatorData.nickname,
            avatar: spectatorData.avatar!,
            message: message,
            timestamp: Date.now(),
            chatReactions: []
        }

        setMessages([...messages, chat]);
        handleSendChatMessage(chat);
    }

    return (
        <div className='h-full flex flex-col justify-between'>
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
            <div className='relative h-fit w-full flex flex-col justify-end items-start p-2 overflow-y-auto'>
                <div className='h-full w-full overflow-y-auto custom-scrollbar '>
                    {messages.map((message, index) => (
                        <div
                            className='flex justify-center items-center p-2 '
                            key={index}
                        >
                            {message.message}
                        </div>
                    ))}
                </div>
                <div className={cn(
                    'w-full px-2 gap-x-2 flex justify-center items-center',
                    'focus-within:ring-1 focus-within:border-ring focus-within:ring-ring/50 rounded-xl',
                    'dark:bg-input/30'
                )}>
                    <HiOutlineEmojiHappy
                        className='size-7 p-1 hover:bg-neutral-900 rounded-full cursor-pointer '
                    />
                    <TextArea
                        autogrow
                        ref={inputRef}
                        className={cn(
                            'w-full min-h-10 max-h-40 overflow-y-auto resize-none border-none ',
                            'py-2 px-1',
                            'focus-visible:ring-0',
                            'bg-transparent'
                        )}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <MdChevronRight
                        className='size-7 p-1 hover:bg-neutral-900 rounded-full cursor-pointer'
                        onClick={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
}
