'use client';
import Canvas from "@/components/canvas/Canvas";
import UtilityCard from "@/components/utility/UtilityCard";
import QuestionPallete from "./QuestionPallete";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function QuizLeft() {
    const [error, setError] = useState<boolean>(false);
    const maxCharacters = 50
    const { quiz, updateQuiz } = useNewQuizStore();
    const [quizTitle, setQuizTitle] = useState(quiz.title);

    function handleQuizTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > maxCharacters) {
            setError(true);
            return;
        }
        setError(false);
        setQuizTitle(e.target.value);
        updateQuiz({ title: e.target.value });
    }

    return (
        <div className="flex-1 h-full flex justify-center p-4 gap-x-4 min-w-0">
            <QuestionPallete />
            <div className="flex flex-col items-start justify-start flex-1 gap-y-2 min-w-0">
                <UtilityCard className="bg-light-base dark:bg-dark-base/30 py-x-6 border border-neutral-300 dark:border-neutral-800 w-full min-h-[4rem] shadow-none rounded-sm flex items-center">
                    <div className="flex items-center justify-between w-full gap-4 relative">
                        <Input
                            placeholder="Quiz Title"
                            aria-label="quiz-title"
                            onChange={handleQuizTitleChange}
                            type="text"
                            value={quizTitle}
                            className={cn(
                                "!text-lg font-medium tracking-wide flex-1 min-w-0 !py-4 px-2 appearance-none border-none outline-none bg-transparent dark:bg-transparent shadow-none text-center",
                                error && "focus:!ring-2 focus:!ring-red-500/70"

                            )}
                        />
                        <div className={cn("absolute right-2 text-xs px-2 py-1 rounded-sm")}>{maxCharacters - quizTitle.length}</div>
                    </div>
                </UtilityCard>
                <div className="flex-1 flex items-start justify-center w-full min-w-0">
                    <div className="aspect-[16/9] w-full min-w-0">
                        <Canvas />
                    </div>
                </div>
            </div>
        </div>
    );
}