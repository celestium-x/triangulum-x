'use client';

import CanvasAccents from '@/components/utility/CanvasAccents';
import UtilityCard from '@/components/utility/UtilityCard';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import axios from 'axios';
import { useState } from 'react';
import { GET_SELECTED_QUIZ_DATA } from 'routes/api_routes';

// const difficultyIcons: Record<string, React.ReactNode> = {
//     easy: <BsSpeedometer2 size={20} className="text-green-500/60" />,
//     medium: <BsLightningCharge size={20} className="text-yellow-500/60" />,
//     hard: <BsTrophy size={20} className="text-red-500/60" />,
// };

interface QuestionPreviewPalleteProps {
    questions: {
        id: string;
        difficulty: string;
        title: string;
    }[];
}

export default function QuestionPreviewPallete({ questions }: QuestionPreviewPalleteProps) {
    const { session } = useUserSessionStore();
    const { quiz, currentQuestion, updateCurrentQuestion } = useLiveQuizStore();
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | undefined>('');

    async function handleFetchSelectedQuestionData(questionId: string) {
        if (!questionId) return;

        try {
            const res = await axios.get(`${GET_SELECTED_QUIZ_DATA}/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.token}`,
                },
            });

            if (res.data.success) {
                updateCurrentQuestion(res.data.question);
                setSelectedQuestionId(currentQuestion?.id);
            }
        } catch (err) {
            console.error('Failed to fetch question', err);
        }
    }

    const template = templates.find((t) => t.id === quiz?.theme);

    return (
        <UtilityCard
            className={cn(
                'absolute left-0 top-0 z-40 max-w-[11.5rem] w-full max-h-screen shadow-none rounded-l-none bg-neutral-200/80 dark:bg-dark-base backdrop-blur-lg p-0 flex flex-col items-center pr-1 border-none h-full',
            )}
        >
            <div className="w-full py-4 px-4 flex justify-center items-center">
                <span className="text-md font-normal dark:text-neutral-100 tracking-wide">
                    Questions
                </span>
            </div>

            <div className="w-full flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
                {questions.map((q, idx) => (
                    <div key={q.id} className="h-[75px] w-full px-2 grid grid-cols-10 gap-x-3">
                        <div className="pb-2 dark:text-light-base col-span-2 text-sm font-medium flex justify-end items-end">
                            {idx + 1}.
                        </div>

                        <div
                            onClick={() => handleFetchSelectedQuestionData(q.id)}
                            className={cn(
                                'w-full rounded-md h-18 p-0.5 cursor-pointer relative col-span-8',
                                selectedQuestionId === q.id && 'ring-2 ring-blue-500',
                                'hover:ring-2 hover:ring-blue-300',
                            )}
                        >
                            <CanvasAccents
                                design={template?.accent_type}
                                accentColor={template?.accent_color}
                            />
                            <div
                                style={{
                                    backgroundColor: template?.background_color,
                                    color: template?.text_color,
                                }}
                                className="w-full h-full rounded-sm flex items-center justify-center relative group text-[10px] text-center p-1"
                            >
                                <p className="line-clamp-2">{q?.title}</p>

                                <div className="text-[5px] dark:text-light-base bg-dark-base rounded-full absolute top-2 left-2 px-2 py-1 hidden group-hover:block">
                                    Question {idx + 1}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </UtilityCard>
    );
}
