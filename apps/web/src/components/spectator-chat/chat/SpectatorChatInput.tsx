import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import UtilityCard from '@/components/utility/UtilityCard';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
}

export default function SpectatorChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState<string>('');
    const [isEmojiVisible, setIsEmojiVisible] = useState<boolean>(false);
    const quickEmojis = ['👋', '😄', '❤️', '🎉', '🔥', '👍'];

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const emojiItemsRef = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
            );
        }

        if (inputRef.current) {
            gsap.to(inputRef.current, {
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            });
        }
    }, []);

    const handleSend = () => {
        if (message.trim()) {
            if (inputRef.current) {
                gsap.to(inputRef.current, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut',
                });
            }

            onSendMessage(message.trim());
            setMessage('');

            setTimeout(() => {
                if (inputRef.current) {
                    gsap.to(inputRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)',
                    });
                }
            }, 200);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInputFocus = () => {
        if (inputRef.current) {
            gsap.to(inputRef.current, {
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleInputBlur = () => {
        if (inputRef.current) {
            gsap.to(inputRef.current, {
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const handleEmojiClick = (emoji: string) => {
        const clickedEmoji = emojiItemsRef.current.find((el) => el?.textContent === emoji);
        if (clickedEmoji) {
            gsap.to(clickedEmoji, {
                scale: 1.5,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
            });
        }

        setTimeout(() => {
            onSendMessage(emoji);
            setIsEmojiVisible(false);
        }, 300);
    };

    const addToEmojiRefs = (el: HTMLButtonElement | null) => {
        if (el && !emojiItemsRef.current.includes(el)) {
            emojiItemsRef.current.push(el);
        }
    };

    return (
        <div ref={containerRef} className="px-5 py-3">
            <div className="flex items-center space-x-3">
                <div className="flex-1">
                    <Input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="Type here"
                        className={cn(
                            'w-full px-6 py-6 bg-neutral-200 rounded-3xl',
                            'font-normal text-dark-base dark:text-light-base placeholder:text-neutral-400 !text-sm',
                            'focus:outline-none transition-all duration-300 placeholder:text-sm',
                            'focus-visible:ring-[1px]',
                        )}
                    />
                </div>

                <div className="relative" onClick={() => setIsEmojiVisible((prev) => !prev)}>
                    <Button
                        className={cn(
                            '!py-[22px] rounded-xl shadow-none aspect-square cursor-pointer transition-colors',
                            'bg-neutral-200 hover:bg-neutral-400/30 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-500 dark:text-neutral-400',
                            'border border-neutral-300 dark:border-neutral-700',
                        )}
                        variant={'ghost'}
                    >
                        <Smile className="size-7 stroke-1 " />
                    </Button>

                    {isEmojiVisible && (
                        <UtilityCard
                            className={cn(
                                'absolute bottom-14 mb-1 right-1 flex space-x-2 dark:bg-neutral-700 border rounded-xl px-4 py-2 z-10',
                                'shadow-md',
                            )}
                        >
                            {quickEmojis.map((emoji) => (
                                <Button
                                    variant={'ghost'}
                                    key={emoji}
                                    ref={addToEmojiRefs}
                                    onClick={() => handleEmojiClick(emoji)}
                                    className="text-lg hover:scale-105 transition-transform cursor-pointer rounded-full p-1"
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
