"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLiveQuizStore } from "@/store/live-quiz/useLiveQuizStore";
import QuestionPreviewPallete from "../common/QuestionPreviewPallete";
import { useUserSessionStore } from "@/store/user/useUserSessionStore";
import { GET_LIVE_QUIZ_SUMMARIZED_DATA } from "routes/api_routes";


export default function QuestionPreviewHostRight() {
    const { quiz } = useLiveQuizStore();
    const [questions, setQuestions] = useState([]);
    const { session } = useUserSessionStore();

    console.log("quiz is: ", quiz);
    console.log("quiz title is: ", quiz)

    useEffect(() => {
        async function fetchQuestions() {
            if (!quiz?.id) return;

            try {
                const res = await axios.get(`${GET_LIVE_QUIZ_SUMMARIZED_DATA}/${quiz.id}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.token}`,
                    }
                });


                console.log("data is : ", res.data);

                if (res.data.success) {
                    setQuestions(res.data.questions);
                } else {
                    console.error("Failed to fetch questions");
                }
            } catch (error) {
                console.error("Error fetching summarized data:", error);
            }
        }

        fetchQuestions();

    }, [quiz?.id]);


    return (
        <div className="w-full max-w-[22vw] h-full flex flex-col justify-between bg-light-base dark:bg-neutral-900 rounded-l-xl border-l dark:border-neutral-700 border-neutral-200 z-[20] shadow-2xl px-6 py-6 dark:text-neutral-300 text-dark-primary">
            <div className="flex-shrink-0">
                <h2 className="text-lg font-bold mb-2"># Preview Details</h2>
                <div className="text-sm font-normal tracking-wide mt-3">{quiz?.title}</div>

                <div className="mt-10">
                    {questions.length > 0 && (
                        <QuestionPreviewPallete
                            questions={questions}
                            theme={quiz?.theme!}
                            title={quiz?.title!}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
