
import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { gsap } from 'gsap';
import SpectatorChunkyButton from './SpectatorChunkyButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
}

export default function SpectatorChatInput ({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [isEmojiVisible, setIsEmojiVisible] = useState(false);
    const quickEmojis = ['👋', '😄', '❤️', '🎉', '🔥', '👍'];
    
    const inputRef = useRef<HTMLInputElement>(null);
    const emojiPanelRef = useRef<HTMLDivElement>(null);
    const emojiButtonRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const emojiItemsRef = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        if (containerRef.current) {
    
            gsap.fromTo(containerRef.current, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
            );
        }

        if (inputRef.current) {
    
            gsap.to(inputRef.current, {
                boxShadow: "0 6px 0 0 rgba(0,0,0,0.2), 0 0 0 0 rgba(245,157,42,0.3)",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        }
    }, []);

    useEffect(() => {
        if (emojiPanelRef.current) {
            if (isEmojiVisible) {
                gsap.set(emojiPanelRef.current, { display: 'flex' });
                gsap.fromTo(emojiPanelRef.current,
                    { 
                        opacity: 0, 
                        y: 10, 
                        scale: 0.9,
                        rotationX: -15
                    },
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        rotationX: 0,
                        duration: 0.3, 
                        ease: "back.out(1.7)"
                    }
                );

        
                gsap.fromTo(emojiItemsRef.current,
                    { scale: 0, rotation: 180 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "back.out(2)"
                    }
                );
            } else {
                gsap.to(emojiPanelRef.current, {
                    opacity: 0,
                    y: 10,
                    scale: 0.9,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        if (emojiPanelRef.current) {
                            gsap.set(emojiPanelRef.current, { display: 'none' });
                        }
                    }
                });
            }
        }
    }, [isEmojiVisible]);

    const handleSend = () => {
        if (message.trim()) {
    
            if (inputRef.current) {
                gsap.to(inputRef.current, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }
            
            onSendMessage(message.trim());
            setMessage('');
            
    
            setTimeout(() => {
                if (inputRef.current) {
                    gsap.to(inputRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(1.7)"
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
                boxShadow: "0 8px 0 0 rgba(0,0,0,0.2), 0 0 0 3px rgba(245,157,42,0.5)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleInputBlur = () => {
        if (inputRef.current) {
            gsap.to(inputRef.current, {
                boxShadow: "0 6px 0 0 rgba(0,0,0,0.2)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleEmojiHover = () => {
        if (emojiButtonRef.current) {
            gsap.to(emojiButtonRef.current, {
                rotation: 5,
                scale: 1.1,
                duration: 0.3,
                ease: "back.out(2)"
            });
        }
        setIsEmojiVisible(true);
    };

    const handleEmojiLeave = () => {
        if (emojiButtonRef.current) {
            gsap.to(emojiButtonRef.current, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        }
        setIsEmojiVisible(false);
    };

    const handleEmojiClick = (emoji: string) => {

        const clickedEmoji = emojiItemsRef.current.find(el => el?.textContent === emoji);
        if (clickedEmoji) {
            gsap.to(clickedEmoji, {
                scale: 1.5,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
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
                        className="w-full px-6 py-6 bg-neutral-200 rounded-3xl
                         font-normal text-neutral-200 placeholder:text-neutral-400 !text-lg
                         focus:outline-none transition-all duration-300 placeholder:text-base"
                    />
                </div>

                <div 
                    className="relative"
                    onMouseEnter={handleEmojiHover}
                    onMouseLeave={handleEmojiLeave}
                >
                    <div ref={emojiButtonRef}>
                        <SpectatorChunkyButton className='border-none shadow-none dark:bg-neutral-800 dark:text-neutral-400' size="md">
                            <Smile className="w-6 h-6" />
                        </SpectatorChunkyButton>
                    </div>

                    <div
                        ref={emojiPanelRef}
                        className="absolute bottom-14 mb-1 -right-14 -translate-x-1/2 hidden space-x-2
                        dark:bg-neutral-700 border rounded-xl px-4 py-2 z-10"
                        style={{ display: 'none' }}
                    >
                        {quickEmojis.map((emoji) => (
                            <Button
                                variant={"ghost"}
                                key={emoji}
                                ref={addToEmojiRefs}
                                onClick={() => handleEmojiClick(emoji)}
                                className="text-lg hover:scale-110 transition-transform cursor-pointer 
                                          rounded-full p-1"
                            >
                                {emoji}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};