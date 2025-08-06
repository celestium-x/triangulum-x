import UtilityCard from '@/components/utility/UtilityCard';
import LiveQuizBackendActions from '@/lib/backend/live-quiz-backend-actions';
import { templates } from '@/lib/templates';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoIosReturnLeft } from 'react-icons/io';
import { FaLightbulb } from 'react-icons/fa';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import DifficultyTicker from '@/components/tickers/DifficultyTicker';

export default function HostQuestionReviewFooter() {
    const { quiz, currentQuestion, updateQuiz, updateCurrentQuestion } = useLiveQuizStore();
    const template = templates.find((t) => t.id === quiz?.theme);
    const { session } = useUserSessionStore();
    const [openExplanation, setOpenExplanation] = useState<boolean>(false);

    async function handleGetNextQuestion() {
        if (!quiz?.id || currentQuestion?.orderIndex == null || !session?.user.token) {
            return;
        }

        const data = await LiveQuizBackendActions.getQuestionDetailByIndex(
            quiz.id,
            currentQuestion.orderIndex,
            session.user.token,
        );
        updateQuiz({
            questions: [
                ...quiz.questions.slice(0, currentQuestion.orderIndex),
                data,
                ...quiz.questions.slice(currentQuestion.orderIndex + 1),
            ],
        });
        updateCurrentQuestion(data);
    }

    return (
        <div className="absolute bottom-4 z-100 w-full">
            <div className="flex items-center justify-evenly">
                <section className="flex items-center flex-shrink-0 gap-x-6 relative">
                    <DifficultyTicker
                        className="font-light tracking-wide bg-light-base dark:bg-dark-base px-4 rounded-full"
                        difficulty={currentQuestion?.difficulty}
                    />
                    <div className="w-fit flex items-center justify-center gap-x-4 relative">
                        <ToolTipComponent content="previous question">
                            <BsArrowLeft
                                strokeWidth={0.8}
                                style={{
                                    border: `1px solid ${template?.border_color}50`,
                                    backgroundColor: `${template?.text_color}20`,
                                }}
                                size={32}
                                className="rounded-full p-1.5 cursor-pointer"
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
                                    <div className="text-sm tracking-wide dark:text-light-base text-dark-primary">
                                        {currentQuestion?.explanation}
                                    </div>
                                </UtilityCard>
                            )}
                        </div>
                        <ToolTipComponent content="next question">
                            <BsArrowRight
                                onClick={handleGetNextQuestion}
                                strokeWidth={0.8}
                                style={{
                                    border: `1px solid ${template?.border_color}50`,
                                    backgroundColor: `${template?.text_color}20`,
                                }}
                                size={32}
                                className="rounded-full p-1.5 cursor-pointer"
                            />
                        </ToolTipComponent>
                    </div>
                </section>

                <div className="flex justify-center group">
                    <div className="flex items-center gap-x-1.5 bg-neutral-100 w-fit px-4 py-2.5 rounded-full shadow-md">
                        <div className="text-xs text-neutral-700 font-light tracking-wide">
                            Press
                        </div>
                        <ToolTipComponent content="Pressing enter will launch the current question previewing on the screen">
                            <span className="bg-neutral-900 text-neutral-100 text-xs font-light tracking-wider px-3 py-1 rounded-lg flex items-center justify-center gap-x-2 cursor-pointer">
                                <IoIosReturnLeft className="max-w-0 group-hover:max-w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                ENTER
                            </span>
                        </ToolTipComponent>
                        <div className="text-xs text-neutral-700 font-light tracking-wide">
                            to launch this question
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
