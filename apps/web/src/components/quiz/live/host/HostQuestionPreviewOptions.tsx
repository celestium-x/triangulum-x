'use client';

import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { useNewQuizStore } from '@/store/new-quiz/useNewQuizStore';
import HostQuestionPreviewInput from '@/components/utility/HostQuestionPreviewInput';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';

export default function HostQuestionPreviewOptions() {
    const { quiz, currentQuestionIndex, editQuestion } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];
    const currentQTemplate = templates.find((t) => t.id === quiz.theme);
    const { currentQuestion } = useLiveQuizStore();

    const handleInputChange = (value: string, index: number) => {
        if (!currentQ) return;
        const newOptions = [...currentQ.options];
        newOptions[index] = value;
        editQuestion(currentQuestionIndex, { options: newOptions });
    };

    if (!currentQuestion?.options) return null;

    return (
        <div className="w-full grid  gap-x-40 gap-y-10">
            {currentQuestion.options.map((option, idx) => (
                <div
                    key={idx}
                    className={cn(
                        'flex justify-start items-center gap-x-3 w-full transition-all duration-200 ease-out rounded-md dark:text-neutral-700',
                    )}
                >
                    <HostQuestionPreviewInput
                        className="py-6 px-5 "
                        color={currentQTemplate?.bars?.[idx]}
                        value={option}
                        onChange={(val) => handleInputChange(val, idx)}
                    />
                </div>
            ))}
        </div>
    );
}
