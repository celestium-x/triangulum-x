'use client';
import { cn } from '@/lib/utils';
import { Boldonse } from 'next/font/google';
import Image from 'next/image';
import { FaCommentAlt, FaGift, FaLocationArrow, FaQuestion, FaStar } from 'react-icons/fa';
import { AlarmClock } from '../ui/animated-icons/AlarmClock';
import { BsTrophyFill } from 'react-icons/bs';
import ToolTipComponent from '../utility/TooltipComponent';
import React, { useEffect, useRef, useState, useMemo } from 'react';

const boldonse = Boldonse({
    weight: '400',
    subsets: ['latin'],
});

type ZigzagLine = {
    id: number;
    path: string;
    endX: number;
    endY: number;
    bubbleColor: string;
    bubbleSize: number;
    animationDelay: number;
};

const getStaticZigzagLines = () => {
    return [
        {
            id: 0,
            path: 'M 138 0 L 110 -45 L 150 -85 L 120 -125 L 160 -165',
            endX: 160,
            endY: -165,
            bubbleColor: '#FF5C7D',
            bubbleSize: 12,
            animationDelay: 200,
        },
        {
            id: 1,
            path: 'M 412 0 L 440 -40 L 400 -80 L 430 -120 L 390 -160',
            endX: 390,
            endY: -160,
            bubbleColor: '#03AAAA',
            bubbleSize: 15,
            animationDelay: 600,
        },
        {
            id: 2,
            path: 'M 550 87 L 590 60 L 630 100 L 670 75 L 710 115',
            endX: 710,
            endY: 115,
            bubbleColor: '#9573E1',
            bubbleSize: 10,
            animationDelay: 1000,
        },
        {
            id: 3,
            path: 'M 550 263 L 595 280 L 635 240 L 675 265 L 715 225',
            endX: 715,
            endY: 225,
            bubbleColor: '#FFE95C',
            bubbleSize: 14,
            animationDelay: 400,
        },
        {
            id: 4,
            path: 'M 412 350 L 440 390 L 400 430 L 430 470 L 390 510',
            endX: 390,
            endY: 510,
            bubbleColor: '#BA832A',
            bubbleSize: 11,
            animationDelay: 800,
        },
        {
            id: 5,
            path: 'M 138 350 L 110 395 L 150 435 L 120 475 L 160 515',
            endX: 160,
            endY: 515,
            bubbleColor: '#4A7EBE',
            bubbleSize: 13,
            animationDelay: 1200,
        },
        {
            id: 6,
            path: 'M 0 263 L -45 280 L -85 240 L -125 265 L -165 225',
            endX: -165,
            endY: 225,
            bubbleColor: '#522B89',
            bubbleSize: 16,
            animationDelay: 1400,
        },
        {
            id: 7,
            path: 'M 0 87 L -40 60 L -80 100 L -120 75 L -160 115',
            endX: -160,
            endY: 115,
            bubbleColor: '#FF5C7D',
            bubbleSize: 9,
            animationDelay: 1600,
        },
    ];
};

export default function CustomFeatureComponent() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [startContinuousBounce, setStartContinuousBounce] = useState(false);

    const zigzagLines = useMemo(() => getStaticZigzagLines(), []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        setStartContinuousBounce(true);
                    } else {
                        setStartContinuousBounce(false);
                    }
                });
            },
            { threshold: 0.2 },
        );
        const element = ref.current;
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return (
        <div ref={ref} className="w-full flex mt-80 select-none h-full justify-center gap-x-10">
            <div className="flex justify-end select-none gap-x-15 p-2 rounded-3xl relative">
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ overflow: 'visible' }}
                >
                    {zigzagLines.map((line: ZigzagLine) => (
                        <g key={line.id}>
                            <path
                                d={line.path}
                                stroke="rgba(255, 255, 255, 0.15)"
                                strokeWidth="1.5"
                                fill="none"
                                strokeDasharray="4 4"
                                className={cn(
                                    'transition-all duration-1000 ease-out',
                                    isVisible ? 'opacity-100' : 'opacity-0',
                                )}
                                style={{
                                    animationDelay: `${line.animationDelay}ms`,
                                    strokeDashoffset: isVisible ? '0' : '100',
                                    transition: `stroke-dashoffset 1.5s ease-out ${line.animationDelay}ms`,
                                }}
                            />

                            <circle
                                cx={line.endX}
                                cy={line.endY}
                                r={line.bubbleSize}
                                fill={line.bubbleColor}
                                className={cn(
                                    'transition-all duration-800 ease-out',
                                    isVisible ? 'opacity-80 animate-pulse' : 'opacity-0 scale-0',
                                )}
                                style={{
                                    animationDelay: `${line.animationDelay + 500}ms`,
                                    transformOrigin: `${line.endX}px ${line.endY}px`,
                                    filter: 'blur(0.5px)',
                                }}
                            />

                            {/* Inner glow for bubble */}
                            <circle
                                cx={line.endX}
                                cy={line.endY}
                                r={line.bubbleSize * 0.6}
                                fill="rgba(255, 255, 255, 0.3)"
                                className={cn(
                                    'transition-all duration-800 ease-out',
                                    isVisible ? 'opacity-60' : 'opacity-0 scale-0',
                                )}
                                style={{
                                    animationDelay: `${line.animationDelay + 700}ms`,
                                    transformOrigin: `${line.endX}px ${line.endY}px`,
                                }}
                            />
                        </g>
                    ))}
                </svg>

                <div className="flex justify-center relative z-10">
                    <div
                        className={cn(
                            'w-[550px] h-[350px] border rounded-3xl flex justify-center items-center',
                            'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950',
                            'relative shadow-2xl shadow-neutral-800/20 drop-shadow-2xl',
                            'transition-all duration-800 ease-out',
                            isVisible
                                ? 'transform scale-100 opacity-100 translate-y-0'
                                : 'transform scale-75 opacity-0 translate-y-8',
                        )}
                    >
                        <FaStar
                            className={cn(
                                'absolute top-10 left-22 text-white/10 w-8 h-8 rotate-12',
                                'hover:text-[#FF5C7D] hover:scale-105 hover:rotate-6 transition-colors duration-200',
                                startContinuousBounce && 'animate-bounce',
                            )}
                            style={{
                                animationDelay: startContinuousBounce ? '0ms' : undefined,
                                animationDuration: startContinuousBounce ? '2s' : undefined,
                                animationIterationCount: startContinuousBounce
                                    ? 'infinite'
                                    : undefined,
                            }}
                        />
                        <FaCommentAlt
                            className={cn(
                                'absolute top-40 right-10 text-white/15 w-7 h-7 -rotate-20',
                                'hover:text-[#b4b4b4] hover:scale-105 hover:-rotate-15 transition-colors duration-200',
                                startContinuousBounce && 'animate-bounce',
                            )}
                            style={{
                                animationDelay: startContinuousBounce ? '0ms' : undefined,
                                animationDuration: startContinuousBounce ? '2.2s' : undefined,
                                animationIterationCount: startContinuousBounce
                                    ? 'infinite'
                                    : undefined,
                            }}
                        />
                        <FaGift
                            className={cn(
                                'absolute top-16 right-36 text-white/10 w-10 h-10 -rotate-12',
                                'hover:text-[#4A7EBE] hover:scale-105 hover:-rotate-6 transition-colors duration-200',
                                startContinuousBounce && 'animate-bounce',
                            )}
                            style={{
                                animationDelay: startContinuousBounce ? '0ms' : undefined,
                                animationDuration: startContinuousBounce ? '1.8s' : undefined,
                                animationIterationCount: startContinuousBounce
                                    ? 'infinite'
                                    : undefined,
                            }}
                        />
                        <FaQuestion
                            className={cn(
                                'absolute bottom-12 right-60 text-white/15 w-7 h-7 rotate-25',
                                'hover:text-[#BA832A] hover:scale-105 hover:rotate-20 transition-colors duration-200',
                                startContinuousBounce && 'animate-bounce',
                            )}
                            style={{
                                animationDelay: startContinuousBounce ? '0ms' : undefined,
                                animationDuration: startContinuousBounce ? '2.4s' : undefined,
                                animationIterationCount: startContinuousBounce
                                    ? 'infinite'
                                    : undefined,
                            }}
                        />
                        <BsTrophyFill
                            className={cn(
                                'absolute bottom-25 left-15 text-white/15 w-8 h-8 -rotate-12',
                                'hover:text-[#522B89] hover:scale-105 hover:-rotate-6 transition-colors duration-200',
                                startContinuousBounce && 'animate-bounce',
                            )}
                            style={{
                                animationDelay: startContinuousBounce ? '0ms' : undefined,
                                animationDuration: startContinuousBounce ? '2.1s' : undefined,
                                animationIterationCount: startContinuousBounce
                                    ? 'infinite'
                                    : undefined,
                            }}
                        />

                        <div
                            className={cn(
                                'flex gap-x-3 border px-5 py-3 rounded-full shadow-xl',
                                'bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950',
                                'hover:scale-105 transition-all transform-3d duration-200 ease-in-out',
                                'transition-all duration-600 ease-out',
                                isVisible
                                    ? 'transform scale-100 opacity-100'
                                    : 'transform scale-90 opacity-0',
                            )}
                        >
                            <div className="h-10 w-10 rounded-full border overflow-hidden flex justify-center items-center">
                                <Image
                                    src={
                                        'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-17.jpg'
                                    }
                                    alt="James"
                                    width={100}
                                    height={100}
                                    unoptimized
                                />
                            </div>
                            <div className="flex justify-center items-center text-md">
                                James Harrid
                            </div>
                        </div>

                        <div
                            className={cn(
                                'absolute top-20 left-26 bg-[#03AAAA] px-3 py-1.5 rounded-full font-semibold text-black',
                                'hover:-translate-y-0.5 transition-all duration-150 shadow-xl',
                                'transition-all duration-500 ease-out',
                                isVisible
                                    ? 'transform translate-y-0 opacity-100'
                                    : 'transform -translate-y-4 opacity-0',
                            )}
                        >
                            Correct answer
                        </div>
                        <div
                            className={cn(
                                'absolute top-26 left-58 rotate-90 text-[#03AAAA] px-3 py-1.5 rounded-full font-semibold',
                                'transition-all duration-500 ease-out',
                                isVisible
                                    ? 'transform scale-100 opacity-100'
                                    : 'transform scale-0 opacity-0',
                            )}
                        >
                            <FaLocationArrow />
                        </div>
                        <div
                            className={cn(
                                'absolute bottom-20 left-37 bg-[#ebebeb] px-3 py-1.5 rounded-full font-semibold text-black',
                                'hover:-translate-y-0.5 transition-all duration-150 shadow-xl',
                                'transition-all duration-500 ease-out',
                                isVisible
                                    ? 'transform translate-y-0 opacity-100'
                                    : 'transform translate-y-4 opacity-0',
                            )}
                        >
                            Win
                        </div>
                        <div
                            className={cn(
                                'absolute bottom-26 left-47 rotate-1 text-[#ebebeb] px-3 py-1.5 rounded-full font-semibold',
                                'transition-all duration-500 ease-out',
                                isVisible
                                    ? 'transform scale-100 opacity-100'
                                    : 'transform scale-0 opacity-0',
                            )}
                        >
                            <FaLocationArrow />
                        </div>
                        <div
                            className={cn(
                                'absolute bottom-22 right-20 bg-[#FFE95C] px-3 py-1.5 rounded-full font-semibold text-black',
                                'hover:-translate-y-0.5 transition-all duration-150 shadow-xl',
                                'transition-all duration-500 ease-out',
                                isVisible
                                    ? 'transform translate-y-0 opacity-100'
                                    : 'transform translate-y-4 opacity-0',
                            )}
                        >
                            Lifeline
                        </div>
                        <div
                            className={cn(
                                'absolute bottom-28 right-36 -rotate-90 text-[#FFE95C] px-3 py-1.5 rounded-full font-semibold',
                                'transition-all duration-500 ease-out',
                                isVisible
                                    ? 'transform scale-100 opacity-100'
                                    : 'transform scale-0 opacity-0',
                            )}
                        >
                            <FaLocationArrow />
                        </div>

                        <div
                            className={cn(
                                'h-55 w-30 absolute -left-10 p-1 -top-5 flex flex-col gap-1 bg-neutral-950 rounded-2xl border',
                                'transition-all duration-700 ease-out',
                                isVisible
                                    ? 'transform translate-x-0 opacity-100'
                                    : 'transform -translate-x-8 opacity-0',
                            )}
                        >
                            <div className="w-full h-full border rounded-2xl justify-center items-center bg-neutral-900 flex flex-col">
                                <AlarmClock className="h-10 w-10" />
                            </div>
                            <div
                                className={cn(
                                    `w-full h-full border text-[25px] rounded-2xl bg-neutral-900`,
                                    `${boldonse.className} leading-10 tracking-wide`,
                                    'flex-col flex justify-center items-center text-center text-[#e4e4e4]',
                                )}
                            >
                                WIN IN <span className="text-[#BA832A]">TIME</span>
                            </div>
                        </div>

                        <div
                            className={cn(
                                'h-auto w-auto absolute -right-8 p-1.5 top-5 flex flex-col gap-1.5 bg-neutral-950 rounded-2xl border',
                                'transition-all duration-700 ease-out',
                                isVisible
                                    ? 'transform translate-x-0 opacity-100'
                                    : 'transform translate-x-8 opacity-0',
                            )}
                        >
                            {[
                                'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-10.jpg',
                                'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-15.jpg',
                                'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-7.jpg',
                                'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-5.jpg',
                            ].map((src, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'w-10 h-10 border rounded-full justify-center items-center bg-neutral-900 flex flex-col overflow-hidden',
                                        'hover:scale-105 transition-transform duration-200',
                                        'transition-all duration-300 ease-out',
                                        isVisible
                                            ? 'transform scale-100 opacity-100'
                                            : 'transform scale-0 opacity-0',
                                    )}
                                >
                                    <Image
                                        src={src}
                                        alt="Avatar"
                                        width={100}
                                        height={100}
                                        unoptimized
                                    />
                                </div>
                            ))}
                            <ToolTipComponent content="Yupp! Scalability is not an issue">
                                <div
                                    className={cn(
                                        'w-10 h-10 border rounded-full justify-center items-center bg-neutral-900',
                                        'text-[#BA832A] font-semibold tracking-wide flex text-center align-middle text-xs overflow-hidden',
                                        'hover:scale-105 transition-transform duration-200',
                                        'transition-all duration-300 ease-out',
                                        isVisible
                                            ? 'transform scale-100 opacity-100'
                                            : 'transform scale-0 opacity-0',
                                    )}
                                >
                                    +10K
                                </div>
                            </ToolTipComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
