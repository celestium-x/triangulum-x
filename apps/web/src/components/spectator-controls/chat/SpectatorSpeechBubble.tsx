import React from 'react';
import Image from 'next/image';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
    children: React.ReactNode;
    direction: 'left' | 'right';
    time?: Date;
    avatarUrl?: string;
}

export default function SpectatorSpeechBubble({
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
            <div
                className={`flex justify-center items-center gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                    <Image
                        src={
                            isUser
                                ? senderAvatar
                                : (avatarUrl ??
                                  'https://s3.eu-north-1.amazonaws.com/bucket.kant/avatars/avatar-2.jpg')
                        }
                        alt="Avatar"
                        width={32}
                        height={32}
                        unoptimized
                    />
                </div>

                <div
                    className={cn(
                        `max-w-xs px-5 py-3 rounded-2xl`,
                        isUser
                            ? ' bg-blue-600 dark:bg-blue-600 text-light-base dark:text-light-base '
                            : 'dark:bg-neutral-800 text-dark-base dark:text-light-base',
                        `shadow-sm`,
                        `break-words select-text text-sm`,
                    )}
                >
                    {children}
                </div>
            </div>

            {formattedTime && (
                <div
                    className={`
                        text-[10px] text-neutral-500 font-medium px-1
                        ${isUser ? 'pr-12 text-left' : 'pl-12 text-right'}
                    `}
                >
                    {formattedTime}
                </div>
            )}
        </div>
    );
}
