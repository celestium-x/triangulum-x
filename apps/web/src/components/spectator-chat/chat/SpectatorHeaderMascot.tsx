import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

interface MascotAvatarProps {
    name: string;
    avatar?: string;
    svg?: React.ReactElement;
    isOnline?: boolean;
}

export default function SpectatorHeaderMascot({ name, avatar, svg }: MascotAvatarProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    return (
        <div
            className="relative cursor-pointer"
            onClick={() => {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 600);
            }}
        >
            <div
                className={cn(
                    'w-auto h-auto rounded-full relative',
                    'flex items-center justify-center',
                    'text-3xl text-light-base dark:text-dark-base ',
                    'transform transition-all duration-200',
                    isAnimating ? 'scale-110' : 'hover:scale-105',
                    'overflow-hidden'
                )}
            >
                {avatar ? (
                    <Image
                        src={avatar}
                        alt={`${name}'s avatar`}
                        width={50}
                        height={50}
                        className="object-cover rounded-full"
                        unoptimized
                    />
                ) : (
                    <span>{svg}</span>
                )}
            </div>
        </div>
    );
}
