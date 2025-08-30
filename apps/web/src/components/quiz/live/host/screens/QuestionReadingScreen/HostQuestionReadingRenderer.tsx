'use client';
import CountDownClock from '@/components/ui/CountDownClock';
import { getImageContainerWidth, useWidth } from '@/hooks/useWidth';
import LiveQuizBackendActions from '@/lib/backend/live-quiz-backend-actions';
import { cn } from '@/lib/utils';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function HostQuestionReadingRenderer() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const canvasWidth = useWidth(canvasRef);
    const { currentQuestion, gameSession, quiz, updateQuiz, updateNextQuestion } = useLiveQuizStore();
    const { session } = useUserSessionStore();

    useEffect(() => {
        if (!currentQuestion || !quiz || !gameSession) return;

        // Only filter out the current question after it's been launched
        // Use a more robust filtering approach that maintains array structure
        const updatedQuestions = quiz.questions.map((q) => {
            if (q && q.id === currentQuestion.id) {
                return { ...q, isAsked: true }; // Mark as asked instead of removing
            }
            return q;
        });
        currentQuestion.isAsked = true;
        console.log("current question with updated asking state", currentQuestion);
        updateQuiz({
            questions: updatedQuestions,
        });
    }, [currentQuestion?.id]);

    if (!currentQuestion || !gameSession) {
        return (
            <div className="text-center text-neutral-400 w-full">
                Error in getting current question
            </div>
        );
    }

    return (
        <div
            className={cn(
                'w-full h-full overflow-hidden flex flex-col items-center justify-center',
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
                    <CountDownClock
                        startTime={gameSession.phaseStartTime!}
                        endTime={gameSession.phaseEndTime!}
                    />
                    <div>Participants and Spectators are now reading this question</div>
                </div>
            </div>
        </div>
    );
}
