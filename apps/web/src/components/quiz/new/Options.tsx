"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { ChangeEvent, useEffect, useState } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";

export default function Options() {
    const { quiz, currentQuestionIndex, editQuestion } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];
    const currentQTemplate = templates.find(t => t.id === quiz.theme);

    function handleCorrectOptionChange(idx: number) {
        editQuestion(currentQuestionIndex, { correctAnswer: idx });
    }

    function handleOptionChange(idx: number, value: string) {
        editQuestion(currentQuestionIndex, {
            options: currentQ?.options.map((opt, i) => (i === idx ? value : opt)),
        });
    }

    return (
        <div className="w-full flex flex-col justify-start items-start gap-y-3">
            {currentQ?.options.map((option, idx) => (
                <div className="flex justify-start items-center gap-x-3 w-full" key={idx}>
                    <MdOutlineDragIndicator size={26} className="text-neutral-500 dark:text-neutral-400" />
                    <Checkbox
                        checked={currentQ?.correctAnswer === idx}
                        onCheckedChange={() => handleCorrectOptionChange(idx)}
                        className="scale-150 p-[1px] border border-neutral-300 dark:border-neutral-800"
                    />
                    <ColoredInput
                        key={idx}
                        color={currentQTemplate?.bars[idx]}
                        handleOptionChange={handleOptionChange}
                        initialValue={option}
                        index={idx}
                    />
                </div>
            ))}
        </div>
    );
}

interface ColoredInputProps {
    className?: string;
    initialValue?: string;
    color: string | undefined;
    handleOptionChange: (idx: number, value: string) => void;
    index: number;
}

function ColoredInput({
    className,
    initialValue,
    color,
    index,
    handleOptionChange,
}: ColoredInputProps) {
    const [value, setValue] = useState<string>(initialValue || "");

    useEffect(() => {
        setValue(initialValue || "");
    }, [initialValue]);

    function handlechange(e: ChangeEvent<HTMLInputElement>) {
        handleOptionChange(index, e.target.value);
        setValue(e.target.value);
    }

    return (
        <div
            className={cn(
                "w-full flex justify-start items-center gap-x-2",
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-4 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
        >
            <div
                className="w-5 h-5 rounded-full aspect-square border border-neutral-300 dark:border-neutral-700"
                style={{ background: color }}
            />
            <input
                aria-label="Option"
                className="outline-none h-full w-full bg-transparent text-dark-base dark:text-light-base dark:placeholder:text-light-base placeholder:text-dark-base"
                onChange={handlechange}
                value={value}
            />
        </div>
    );
}
