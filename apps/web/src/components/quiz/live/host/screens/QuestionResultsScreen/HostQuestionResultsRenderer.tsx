'use client';
import CountDownClock from '@/components/ui/CountDownClock';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { getImageContainerWidth, useWidth } from '@/hooks/useWidth';
import { cn } from '@/lib/utils';
import { useLiveQuizHostStore } from '@/store/live-quiz/useLiveQuizHostStore';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { HostScreenEnum } from '@/types/prisma-types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function HostQuestionResultsRenderer() {
    const { handleHostQuestionPreviewPageChange } = useWebSocket();
    const canvasRef = useRef<HTMLDivElement>(null);
    const canvasWidth = useWidth(canvasRef);
    const { currentQuestion, gameSession, updateGameSession } = useLiveQuizStore();
    const { emptyLiveResponses } = useLiveQuizHostStore();

    useEffect(() => {
        emptyLiveResponses();
    }, []);

    if (!currentQuestion || !gameSession) {
        return (
            <div className="text-center text-neutral-400 w-full">
                Error in getting current question
            </div>
        );
    }

    function handleOnClick() {
        handleHostQuestionPreviewPageChange(HostScreenEnum.QUESTION_PREVIEW);
        updateGameSession?.({ hostScreen: HostScreenEnum.QUESTION_PREVIEW });
    }

    return (
        <div
            className={cn(
                'w-full h-full overflow-hidden flex flex-col items-center justify-center ',
                'relative',
            )}
        >
            <div className="min-h-[32rem] w-[90%] flex flex-col justify-between">
                <div
                    className={cn('w-full text-3xl text-center')}
                    dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />
                <div className="flex flex-row items-center justify-center">
                    {currentQuestion.imageUrl && (
                        <div
                            className={cn(
                                'h-full flex flex-col justify-end p-2 sm:p-4 relative mb-15',
                                getImageContainerWidth(canvasWidth),
                            )}
                        >
                            <div className="w-full overflow-hidden relative rounded-sm">
                                <Image
                                    src={currentQuestion.imageUrl}
                                    alt="Question reference image"
                                    className="object-contain w-full h-auto"
                                    width={500}
                                    height={500}
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center gap-y-3">
                    <div className="flex">
                        <CountDownClock
                            startTime={gameSession.phaseStartTime!}
                            endTime={gameSession.phaseEndTime!}
                        />
                        <div
                            className={cn(
                                'flex items-center space-x-2 text-4xl font-bold text-white rounded-xl px-4 py-3',
                                'bg-light-base dark:bg-dark-primary dark:text-light-base text-dark-primary',
                            )}
                            onClick={handleOnClick}
                        >
                            Next Question
                        </div>
                    </div>
                    <div>Participants and Spectators are now seeing results of this question</div>
                </div>
            </div>
        </div>
    );
}
