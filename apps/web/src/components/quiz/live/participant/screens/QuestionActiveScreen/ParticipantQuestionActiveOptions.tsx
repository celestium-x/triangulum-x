import { getResponsiveGap } from '@/components/canvas/CanvasOptions';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useState } from 'react';
import { FaDotCircle, FaRegCircle } from 'react-icons/fa';

type Hex = `#${string}`;

export default function ParticipantQuestionActiveOptions() {
    const {
        currentQuestion,
        quiz: liveQuiz,
        alreadyResponded,
        setAlreadyResponded,
    } = useLiveQuizStore();
    const { handleParticipantResponseMessage } = useWebSocket();
    const [selected, setSelected] = useState<number | null>(null);
    const template = templates.find((t) => t.id === liveQuiz?.theme);

    if (!currentQuestion) return null;

    const maxHeight = 12;
    function hexWithAlpha(hex: Hex, alphaHex: string) {
        if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) return hex;
        return `${hex}${alphaHex}` as Hex;
    }

    const barColors = template?.bars ?? (['#3b82f6'] as Hex[]);

    function handleSelectOption(index: number) {
        if (selected !== null) return;
        if (alreadyResponded) return;
        setSelected(index);
        setAlreadyResponded(true);

        handleParticipantResponseMessage({ selectedAnswer: index });
    }

    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-5 p-8 rounded-xl z-50">
            <div
                className={cn(
                    'w-full h-full flex items-end justify-center',
                    getResponsiveGap(currentQuestion),
                )}
            >
                {currentQuestion.options.map((option, idx) => {
                    const color = barColors[idx % barColors.length] as Hex;
                    const isSelected = selected === idx;
                    const isDisabled = selected !== null && !isSelected;
                    return (
                        <div key={idx} className="flex flex-col gap-y-2 w-full">
                            <div
                                onClick={() => !isDisabled && handleSelectOption(idx)}
                                className={cn(
                                    'group relative isolate flex w-full select-none items-stretch overflow-hidden rounded-2xl',
                                    'border border-white/10 bg-white/[0.03] transition-transform',
                                    !isDisabled &&
                                        'cursor-pointer hover:-translate-y-0.5 active:translate-y-0',
                                    isDisabled && 'opacity-50 cursor-not-allowed',
                                )}
                                style={{
                                    boxShadow: isSelected
                                        ? `0 0 0 1px ${hexWithAlpha(color, '55')}, 0 10px 30px ${hexWithAlpha(color, '25')}`
                                        : '0 6px 20px rgba(0,0,0,0.25)',
                                    backgroundColor: template?.background_color,
                                }}
                            >
                                <div className="w-3" style={{ backgroundColor: color }} />

                                <div className="flex min-h-[64px] flex-1 items-center gap-10 px-4 md:gap-4 md:px-5">
                                    <span
                                        className={cn(
                                            'grid size-6 place-items-center rounded-full border transition-all',
                                            isSelected
                                                ? 'border-transparent'
                                                : 'border-white/25 group-hover:border-white/50',
                                        )}
                                        style={{
                                            background: isSelected ? 'transparent' : 'transparent',
                                        }}
                                    >
                                        {isSelected ? (
                                            <FaDotCircle
                                                style={{ color: color }}
                                                className="h-4 w-4"
                                            />
                                        ) : (
                                            <FaRegCircle className="h-4 w-4 opacity-70" />
                                        )}
                                    </span>

                                    <div className="flex-1">
                                        <div className="text-sm md:text-base">{option}</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-end h-full flex-1 min-w-0 px-1"
                            >
                                <div
                                    className="w-full rounded-tr-md sm:rounded-tr-2xl transition-all duration-700 ease-in-out border border-white/20 z-50"
                                    style={{
                                        height: `${maxHeight}px`,
                                        backgroundColor: template?.bars[idx] || '#4F46E5',
                                    }}
                                />
                                <div className="mt-1 sm:mt-2 min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-center w-full">
                                    <div className="text-xs sm:text-sm text-center px-0.5 sm:px-1 leading-tight font-light break-words">
                                        <span className="hidden sm:inline">{option}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
