import React from 'react';
import Image from 'next/image';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';

interface SpeechBubbleProps {
    children: React.ReactNode;
    direction: 'left' | 'right';
    time?: Date;
    avatarUrl?: string;
}

export default function SpectatorSpeechBubble ({
    children,
    direction,
    time,
    avatarUrl,
}: SpeechBubbleProps) {
    const isUser = direction === 'right';
    const { session } = useUserSessionStore();

    const senderAvatar =
        session?.user.image ??
        'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-1.jpg';

    const formattedTime = time
        ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`flex justify-center items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                    <Image
                        src={isUser ? senderAvatar : avatarUrl ?? 'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-2.jpg'}
                        alt="Avatar"
                        width={32}
                        height={32}
                        unoptimized
                    />
                </div>

                <div
                    className={`
                        max-w-xs px-5 py-3 rounded-2xl
                        ${isUser ? ' dark:bg-[#e7ab1ed0] text-white' : 'dark:bg-neutral-800 text-white'}
                        shadow-sm
                        break-words
                    `}
                >
                    {children}
                </div>
            </div>

            {formattedTime && (
                <div
                    className={`
                        text-xs text-neutral-500 font-medium px-1
                        ${isUser ? 'pr-12 text-left' : 'pl-12 text-right'}
                    `}
                >
                    {formattedTime}
                </div>
            )}
        </div>
    );
};
