import React from 'react';

type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
type SizeVariant = 'sm' | 'md' | 'lg';

interface SizeConfig {
    container: string;
    dot: string;
    text: string;
}

interface DifficultyConfig {
    label: string;
    color: string;
    emptyColor: string;
    textColor: string;
    description: string;
}

interface DifficultyTickerProps {
    difficulty?: DifficultyLevel | number;
    size?: SizeVariant;
    showLabel?: boolean;
    className?: string;
}

export default function DifficultyTicker({
    difficulty = 1,
    size = 'md',
    showLabel = true,
    className = '',
}: DifficultyTickerProps) {
    const level = Math.max(1, Math.min(5, difficulty)) as DifficultyLevel;

    const sizeConfig: Record<SizeVariant, SizeConfig> = {
        sm: { container: 'h-4', dot: 'w-2 h-2', text: 'text-xs' },
        md: { container: 'h-6', dot: 'w-3 h-3', text: 'text-sm' },
        lg: { container: 'h-8', dot: 'w-4 h-4', text: 'text-base' },
    };

    const config = sizeConfig[size] || sizeConfig.md;

    const difficultyConfig: Record<DifficultyLevel, DifficultyConfig> = {
        1: {
            label: 'Beginner',
            color: 'bg-green-500',
            emptyColor: 'bg-gray-200',
            textColor: 'text-green-500',
            description: 'Very Easy',
        },
        2: {
            label: 'Easy',
            color: 'bg-lime-500',
            emptyColor: 'bg-gray-200',
            textColor: 'text-lime-600',
            description: 'Easy',
        },
        3: {
            label: 'Medium',
            color: 'bg-yellow-500',
            emptyColor: 'bg-gray-200',
            textColor: 'text-yellow-600',
            description: 'Moderate',
        },
        4: {
            label: 'Hard',
            color: 'bg-orange-500',
            emptyColor: 'bg-gray-200',
            textColor: 'text-orange-600',
            description: 'Challenging',
        },
        5: {
            label: 'Expert',
            color: 'bg-red-500',
            emptyColor: 'bg-gray-200',
            textColor: 'text-red-600',
            description: 'Very Hard',
        },
    };

    const currentConfig = difficultyConfig[level];

    return (
        <div className={`flex items-center gap-3 bg-light-base px-3 py-1 rounded-md ${className}`}>
            {/* Label */}
            {showLabel && (
                <span className={`font-medium ${currentConfig.textColor} ${config.text}`}>
                    {currentConfig.label}
                </span>
            )}
            {/* Dot indicators */}
            <div className={`flex items-center gap-1 ${config.container}`}>
                {([1, 2, 3, 4, 5] as const).map((dot) => (
                    <div
                        key={dot}
                        className={`${config.dot} rounded-full transition-all duration-200 ${
                            dot <= level ? currentConfig.color : currentConfig.emptyColor
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export type { DifficultyTickerProps, DifficultyLevel, SizeVariant };
