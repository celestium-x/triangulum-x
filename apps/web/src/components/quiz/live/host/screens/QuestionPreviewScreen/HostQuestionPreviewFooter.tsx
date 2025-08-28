import UtilityCard from '@/components/utility/UtilityCard';
import LiveQuizBackendActions from '@/lib/backend/live-quiz-backend-actions';
import { templates } from '@/lib/templates';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoIosReturnLeft } from 'react-icons/io';
import { FaLightbulb } from 'react-icons/fa';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import DifficultyTicker from '@/components/tickers/DifficultyTicker';
import { QuestionType } from '@/types/prisma-types';

export default function HostQuestionReviewFooter() {
    const { quiz, currentQuestion, updateQuiz, updateCurrentQuestion } = useLiveQuizStore();
    const template = templates.find((t) => t.id === quiz?.theme);
    const { session } = useUserSessionStore();
    const [openExplanation, setOpenExplanation] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    // @ts-expect-error: _count is not typed but exists on quiz
    const totalQuestions = quiz?._count.questions;

    function handleKeyDown(event: KeyboardEvent) {
        // event.preventDefault();
        if (event.key === 'ArrowLeft') {
            handlePreviousQuestion();
        } else if (event.key === 'ArrowRight') {
            handleNextQuestion();
        }
    }

    // useEffect(() => {
    //     // this is to get the first question everytime previewing questions before serving it
    //     // as backend will check if the question is asked or not
    //     navigateToQuestion(0);
    // }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    function isQuestionDataComplete(question: QuestionType | undefined) {
        return (
            question &&
            question.id &&
            question.question &&
            question.options &&
            question.explanation !== undefined &&
            question.difficulty !== undefined &&
            question.basePoints !== undefined &&
            question.timeLimit !== undefined &&
            question.orderIndex !== undefined
        );
    }

    async function navigateToQuestion(targetIndex: number) {
        if (!quiz?.questions || targetIndex < 0 || targetIndex >= totalQuestions) return;
        if (loading) return;

        // to avoid duplicacy
        const targetQuestion = quiz.questions[targetIndex];

        // checking for complete data for a question
        if (isQuestionDataComplete(targetQuestion)) {
            updateCurrentQuestion(targetQuestion!);
            return;
        }
        if (!quiz?.id || !session?.user.token) return;
        setLoading(true);
        try {
            const question: QuestionType = await LiveQuizBackendActions.getQuestionDetailByIndex(
                quiz.id,
                targetIndex,
                session.user.token,
            );

            if (question) {
                const isQuestionExists = quiz?.questions.find((q) => q && q.id === question.id);

                if (!isQuestionExists) {
                    const updatedQuestions = [...quiz.questions];
                    updatedQuestions.push(question);
                    updateQuiz({
                        questions: updatedQuestions,
                    });
                }
                updateCurrentQuestion(question);
            }
        } catch (error) {
            console.error('Failed to fetch question data:', error);
        } finally {
            setLoading(false);
            // console.log('[NAVIGATION] quiz: ', quiz);
        }
    }

    function handlePreviousQuestion() {
        if (!quiz?.questions || !currentQuestion || currentQuestion.orderIndex <= 0) {
            // console.log('left click failed');
            return;
        }
        // console.log('left clicked');
        navigateToQuestion(currentQuestion.orderIndex - 1);
    }

    function handleNextQuestion() {
        if (!currentQuestion || !quiz?.questions) {
            return;
        }
        if (currentQuestion.orderIndex >= totalQuestions - 1) {
            return;
        }
        navigateToQuestion(currentQuestion.orderIndex + 1);
    }

    const isPrevDisabled = !currentQuestion || currentQuestion.orderIndex <= 0 || loading;
    const isNextDisabled =
        !currentQuestion ||
        !quiz?.questions ||
        currentQuestion.orderIndex >= totalQuestions - 1 ||
        loading;

    const [platform, setPlatform] = useState<'mac' | 'windows' | 'other'>('other');
    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();

        if (platform.includes('mac') || userAgent.includes('mac')) {
            setPlatform('mac');
        } else if (platform.includes('win') || userAgent.includes('win')) {
            setPlatform('windows');
        }
    }, []);

    return (
        <div className="absolute bottom-4 left-4 z-100">
            <section className="flex items-center flex-shrink-0 gap-x-6 relative">
                <div className="w-fit flex items-center justify-center gap-x-4 relative">
                    <ToolTipComponent content="previous question">
                        <BsArrowLeft
                            onClick={handlePreviousQuestion}
                            strokeWidth={0.8}
                            style={{
                                border: `1px solid ${template?.border_color}50`,
                                backgroundColor: `${template?.text_color}20`,
                                opacity: isPrevDisabled ? 0.5 : 1,
                            }}
                            size={32}
                            className={`rounded-full p-1.5 ${isPrevDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                    </ToolTipComponent>
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenExplanation(true)}
                        onMouseLeave={() => setOpenExplanation(false)}
                    >
                        <FaLightbulb
                            strokeWidth={0.8}
                            style={{
                                border: `1px solid ${template?.border_color}50`,
                                backgroundColor: `${template?.text_color}20`,
                            }}
                            size={32}
                            className="rounded-full p-1.5 cursor-pointer"
                        />
                        {openExplanation && currentQuestion?.explanation && (
                            <UtilityCard className="absolute bottom-10 min-w-[16rem] w-fit px-4 py-2 text-wrap">
                                <div className="text-sm tracking-wide dark:text-light-base text-dark-primary font-light">
                                    {currentQuestion?.explanation}
                                </div>
                            </UtilityCard>
                        )}
                    </div>
                    <ToolTipComponent content="next question">
                        <BsArrowRight
                            onClick={handleNextQuestion}
                            strokeWidth={0.8}
                            style={{
                                border: `1px solid ${template?.border_color}50`,
                                backgroundColor: `${template?.text_color}20`,
                                opacity: isNextDisabled ? 0.5 : 1,
                            }}
                            size={32}
                            className={`rounded-full p-1.5 ${isNextDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                    </ToolTipComponent>
                </div>
                <DifficultyTicker
                    className="font-light tracking-wide bg-light-base dark:bg-dark-base px-4 rounded-full"
                    difficulty={currentQuestion?.difficulty}
                />
                <div className="flex justify-center group">
                    <div className="flex items-center gap-x-1.5 bg-neutral-100 w-fit px-4 py-2.5 rounded-full shadow-md">
                        <div className="text-xs text-neutral-700 font-light tracking-wide">
                            Press
                        </div>
                        <ToolTipComponent content="Pressing enter will launch the current question previewing on the screen">
                            <span className="bg-neutral-900 text-neutral-100 text-xs font-light tracking-wider px-3 py-1 rounded-lg flex items-center justify-center gap-x-2 cursor-pointer">
                                <IoIosReturnLeft className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                {platform === 'mac' ? '⌘' : 'Ctrl'} + ENTER
                            </span>
                        </ToolTipComponent>
                        <div className="text-xs text-neutral-700 font-light tracking-wide">
                            to launch this question
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
