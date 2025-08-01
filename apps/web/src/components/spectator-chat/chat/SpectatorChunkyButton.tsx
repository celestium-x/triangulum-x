// ChunkyButton.tsx
import React from 'react';

interface ChunkyButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

export default function SpectatorChunkyButton({
    children,
    onClick,
    size = 'md',
    disabled = false,
    className,
}: ChunkyButtonProps) {
    const sizeClasses = {
        sm: 'w-10 h-10 text-sm',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-lg',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` ${className} ${sizeClasses[size]} rounded-2xl text-white transform transition-all duration-150
        hover:translate-y-1
        active:translate-y-2 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        flex items-center justify-center
      `}
        >
            {children}
        </button>
    );
}
