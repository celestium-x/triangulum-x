'use client';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';
import { getImageContainerWidth, useWidth } from '@/hooks/useWidth';
import Image from 'next/image';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import HostQuestionPreviewOptions from './HostQuestionPreviewOptions';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { QuestionType } from '@/types/prisma-types';
import LiveQuizBackendActions from '@/lib/backend/live-quiz-backend-actions';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';

export default function HostQuestionPreviewRenderer() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const canvasWidth = useWidth(canvasRef);
    const { currentQuestion, quiz, updateCurrentQuestion, updateQuiz } = useLiveQuizStore();
    const { handleSendHostLaunchQuestion } = useWebSocket();
    const { session } = useUserSessionStore();

    function handleLaunchQuestion(e: KeyboardEvent) {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && currentQuestion) {
            e.preventDefault();
            handleSendHostLaunchQuestion({
                questionId: currentQuestion?.id,
                questionIndex: currentQuestion?.orderIndex,
            });
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleLaunchQuestion);
        return () => {
            document.removeEventListener('keydown', handleLaunchQuestion);
        };
    });

    useEffect(() => {
        if (!quiz) return;

        if (quiz.questions === undefined || quiz.questions.length === 0) {
            async function fetchQuestion() {
                if (!quiz) return;

                const question: QuestionType =
                    await LiveQuizBackendActions.getQuestionDetailByIndex(
                        quiz.id,
                        0,
                        session?.user.token,
                    );

                // console.log('received question at start: ', question);

                if (question) {
                    // console.log('checking if question exists in state');
                    const isQuestionExists = quiz?.questions.find((q) => q && q.id === question.id);

                    if (!isQuestionExists) {
                        // console.log("question doesn't exist in the state");
                        updateQuiz({
                            questions: [question],
                        });
                    }
                    updateCurrentQuestion(question);
                }
            }
            fetchQuestion();
        }
    }, [quiz, session?.user.token, updateCurrentQuestion, updateQuiz]);

    if (!currentQuestion) {
        return (
            <div className="text-center text-neutral-700 dark:text-neutral-400 text-2xl h-full w-full ">
                Select a question to preview
            </div>
        );
    }

    return (
        <div
            ref={canvasRef}
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
                    <HostQuestionPreviewOptions />
                </div>
            </div>
        </div>
    );
}
