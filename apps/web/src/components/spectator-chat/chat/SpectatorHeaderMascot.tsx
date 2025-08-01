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
                className={`
                    w-auto h-auto rounded-full flex items-center justify-center text-3xl
                    transform transition-all duration-200
                    ${isAnimating ? 'scale-110' : 'hover:scale-105'}
                    relative overflow-hidden
                `}
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
