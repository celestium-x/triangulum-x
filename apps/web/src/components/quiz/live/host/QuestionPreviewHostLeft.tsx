'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import QuestionPreviewPallete from '../common/QuestionPreviewPallete';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { GET_LIVE_QUIZ_SUMMARIZED_DATA } from 'routes/api_routes';
import { cn } from '@/lib/utils';
import UtilityCard from '@/components/utility/UtilityCard';

export default function QuestionPreviewHostLeft() {
    const { quiz } = useLiveQuizStore();
    const [questions, setQuestions] = useState([]);
    const { session } = useUserSessionStore();

    useEffect(() => {
        async function fetchQuestions() {
            if (!quiz?.id) return;

            try {
                const res = await axios.get(`${GET_LIVE_QUIZ_SUMMARIZED_DATA}/${quiz.id}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.token}`,
                    },
                });

                if (res.data.success) {
                    setQuestions(res.data.questions);
                } else {
                    console.error('Failed to fetch questions');
                }
            } catch (error) {
                console.error('Error fetching summarized data:', error);
            }
        }

        fetchQuestions();
    }, [quiz?.id, session?.user.token]);

    return (
        <UtilityCard
            className={cn(
                'absolute left-0 top-0 py-8 z-40 flex max-w-[11rem] w-full shadow-none rounded-sm rounded-l-none bg-neutral-200/80 dark:bg-dark-base backdrop-blur-lg p-0 flex-col items-center px-1 border-none h-full',
            )}
        >
            <div className="">
                {questions.length > 0 && (
                    <QuestionPreviewPallete
                        questions={questions}
                    />
                )}
            </div>
        </UtilityCard>
    );
}
