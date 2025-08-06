import UtilityCard from '@/components/utility/UtilityCard';
import LiveQuizBackendActions from '@/lib/backend/live-quiz-backend-actions';
import { templates } from '@/lib/templates';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaLightbulb } from 'react-icons/fa';

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
                <div className="w-fit flex items-center justify-center gap-x-4 relative">
                    <BsArrowLeft
                        strokeWidth={0.8}
                        style={{
                            border: `1px solid ${template?.border_color}50`,
                            backgroundColor: `${template?.text_color}20`,
                        }}
                        size={32}
                        className="rounded-full p-1.5"
                    />
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
                            className="rounded-full p-1.5"
                        />
                        {openExplanation && currentQuestion?.explanation && (
                            <UtilityCard className='absolute bottom-10 min-w-[16rem] w-fit px-4 py-2 text-wrap'>
                                <div className='text-sm tracking-wide dark:text-light-base text-dark-primary'>{currentQuestion?.explanation}</div>
                            </UtilityCard>
                        )}
                    </div>
                    <BsArrowRight
                        onClick={handleGetNextQuestion}
                        strokeWidth={0.8}
                        style={{
                            border: `1px solid ${template?.border_color}50`,
                            backgroundColor: `${template?.text_color}20`,
                        }}
                        size={32}
                        className="rounded-full p-1.5"
                    />
                </div>

                <div className="flex justify-center">
                    <div className="flex items-center gap-x-1.5 bg-neutral-100 w-fit px-4 py-2.5 rounded-full shadow-md">
                        <div className="text-xs text-neutral-700 font-light tracking-wide">
                            Press
                        </div>
                        <span className="bg-neutral-900 text-neutral-100 text-xs font-light tracking-wider px-3 py-1 rounded-lg">
                            ENTER
                        </span>
                        <div className="text-xs text-neutral-700 font-light tracking-wide">
                            to launch this question
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
