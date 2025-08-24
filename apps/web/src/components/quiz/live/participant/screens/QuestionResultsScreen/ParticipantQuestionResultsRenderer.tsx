'use client';
import { cn } from '@/lib/utils';
import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export default function ParticipantQuestionResultsRenderer() {
    const { participants } = useLiveParticipantsStore();
    const sortedParticipants = [...participants].sort((p1, p2) => p2.totalScore - p1.totalScore);

    const participantColors = useMemo(() => {
        return sortedParticipants.map((p, index) => getRandomColor(index + 1));
    }, [sortedParticipants]);

    return (
        <div
            className={cn(
                'w-full h-full overflow-hidden flex justify-center items-center',
                'relative z-[200]',
            )}
        >
            <div className="w-[70%] h-[70%] flex flex-row-reverse items-end justify-center gap-x-5">
                {sortedParticipants.map((p, index) => {
                    const rank = index + 1;
                    const baseHeight = getRelativeHeight(rank);
                    const color = participantColors[index];

                    return (
                        <ParticipantBar
                            key={index}
                            baseHeight={baseHeight}
                            color={color!}
                            nickname={p.nickname}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function ParticipantBar({
    baseHeight,
    color,
    nickname,
}: {
    baseHeight: number;
    color: string;
    nickname: string;
}) {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const variation = Math.floor(Math.random() * 11) - 5;
            const newHeight = baseHeight + variation;
            gsap.to(barRef.current, { height: newHeight, duration: 1, ease: 'power2.inOut' });
        }, 1500);

        return () => clearInterval(interval);
    }, [baseHeight]);

    return (
        <div
            ref={barRef}
            className="rounded-md flex justify-center items-center w-18 transition-all duration-500 ease-in-out"
            style={{
                backgroundColor: color,
                height: baseHeight,
            }}
        >
            <div className="-rotate-90">{nickname.split(' ')[0]}</div>
        </div>
    );
}

function getRelativeHeight(rank: number) {
    if (rank === 1) return 500;
    const calculatedHeight = 500 - (rank - 1) * 40;
    return calculatedHeight > 30 ? calculatedHeight : 30;
}

function getRandomColor(rank: number): string {
    const colors = [
        '#67C090',
        '#26667F',
        '#124170',
        '#468A9A',
        '#33A1E0',
        '#568F87',
        '#064232',
        '#E43636',
        '#F08B51',
        '#E1AA36',
    ];

    switch (rank) {
        case 1:
            return '#facc15';
        case 2:
            return '#C0C0C0';
        case 3:
            return '#CD7F32';
        default:
            return colors[Math.floor(Math.random() * colors.length)] || '#c9ee80';
    }
}
