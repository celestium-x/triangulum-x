import React, { useRef, useState } from 'react';
import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import UtilityCard from '@/components/utility/UtilityCard';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
}

export default function SpectatorChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState<string>('');
    const [isEmojiVisible, setIsEmojiVisible] = useState<boolean>(false);
    const emojiCardRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);
    const quickEmojis = ['👋', '😄', '❤️', '🎉', '🔥', '👍'];

    useHandleClickOutside([emojiCardRef, emojiButtonRef], setIsEmojiVisible);

    function handleSend() {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
        }
    }

    function handleKeyPress(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    function handleEmojiClick(emoji: string) {
        onSendMessage(emoji);
        setIsEmojiVisible(false);
    }

    return (
        <div className="px-5 py-3">
            <div className="flex items-center space-x-3">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type here"
                    className={cn(
                        'flex-1 px-6 py-5 bg-neutral-200 rounded-3xl',
                        'font-normal text-dark-base dark:text-light-base placeholder:text-neutral-400 !text-sm',
                        'focus:outline-none transition-all duration-300 placeholder:text-sm',
                        'focus-visible:ring-[1px]',
                    )}
                />

                <div className="relative">
                    <Button
                        onClick={() => setIsEmojiVisible(!isEmojiVisible)}
                        className={cn(
                            '!py-5 rounded-xl shadow-none aspect-square cursor-pointer transition-colors',
                            'bg-neutral-200 hover:bg-neutral-400/30 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-500 dark:text-neutral-400',
                            'border border-neutral-300 dark:border-neutral-700',
                        )}
                        variant={'ghost'}
                    >
                        <Smile className="size-5 stroke-1" />
                    </Button>

                    {isEmojiVisible && (
                        <UtilityCard
                            ref={emojiCardRef}
                            className={cn(
                                'absolute bottom-14 mb-1 right-1 flex space-x-2 dark:bg-neutral-700 border rounded-full z-10 px-0.5 py-1.5',
                                'shadow-md',
                            )}
                        >
                            {quickEmojis.map((emoji) => (
                                <Button
                                    ref={emojiButtonRef}
                                    variant={'ghost'}
                                    key={emoji}
                                    onClick={() => handleEmojiClick(emoji)}
                                    className="text-xl transition-colors cursor-pointer w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary dark:hover:bg-primary"
                                >
                                    {emoji}
                                </Button>
                            ))}
                        </UtilityCard>
                    )}
                </div>
            </div>
        </div>
    );
}
