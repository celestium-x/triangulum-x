'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import TimerBar from '@/components/ui/TimerBar';
import SpectatorQuestionActiveOptions from '../QuestionActiveScreen/SpectatorQuestionActiveOptions';

export default function SpectaorQuestionActiveRenderer() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const { currentQuestion, gameSession } = useLiveQuizStore();

    if (!currentQuestion || !gameSession) {
        return (
            <div className="text-center text-neutral-400 w-full">
                Error in getting current question
            </div>
        );
    }

    return (
        <div
            ref={canvasRef}
            className={cn(
                'w-full h-full overflow-hidden flex flex-col items-center justify-center space-y-10 z-[100]',
                'relative p-8',
            )}
        >
            <div className="min-h-[32rem] w-[90%] flex flex-col items-center justify-between">
                <div>
                    <div className="w-full text-3xl text-center">{currentQuestion?.question}</div>
                    <div className="mt-8 flex items-center justify-center z-50">
                        <TimerBar
                            startTime={gameSession.phaseStartTime!}
                            endTime={gameSession.phaseEndTime!}
                        />
                    </div>
                </div>
                <SpectatorQuestionActiveOptions />
            </div>
            {/* <div className="grid grid-cols-2 gap-6 w-full max-w-7xl justify-items-center ">
                {currentQuestion.options?.map((option, index) => {
                    const color = barColors[index % barColors.length] as Hex;
                    const isSelected = selected === index;
                    const isDisabled = selected !== null && !isSelected;

                    return (
                        <div
                            key={index}
                            onClick={() => !isDisabled && handleSelectOption(index)}
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
                                backgroundColor: template?.background_color
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
                                        background: isSelected ? color : 'transparent',
                                    }}
                                >
                                    {isSelected ? (
                                        <FaRegCircleDot className="h-4 w-4" />
                                    ) : (
                                        <FaRegCircle className="h-4 w-4 opacity-70" />
                                    )}
                                </span>

                                <div className="flex-1">
                                    <div className="text-sm md:text-base">{option}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
}
