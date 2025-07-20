'use client';
import { cn } from "@/lib/utils";
import { JSX, useEffect, useState, MouseEvent, ChangeEvent } from "react";
import JoinQuizCodeTicker from "../quiz/new/JoinquizCodeTicker";

enum SELECTION_MODE {
    CANVAS = "CANVAS",
    OPTION = "OPTION",
    QUESTION = "QUESTION"
}

export default function Canvas(): JSX.Element {
    const [selectionMode, setSelectionMode] = useState<SELECTION_MODE>(SELECTION_MODE.CANVAS);
    const selectedStyles = "border-2 border-[#5e59b3]";
    const [copied, setCopied] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>("");

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000)
        }
    }, [copied])

    function copyHandler() {
        setCopied(true);
    }

    function questionTapHandler(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        setSelectionMode(SELECTION_MODE.QUESTION);
    }

    function canvasTapHandler(e: MouseEvent<HTMLDivElement>) {
        setSelectionMode(SELECTION_MODE.CANVAS);
    }

    function handleQuestionChange(e: ChangeEvent<HTMLInputElement>) {
        setQuestion(e.target.value);
    }

    function getFontSizeClass(text: string): string {
        const length = text.length;
        if (length === 0) return "text-2xl"; // Default for placeholder
        if (length <= 50) return "text-2xl";  // 24px - short to medium questions
        if (length <= 60) return "text-xl";   // 20px - longer questions
        if (length <= 70) return "text-lg";   // 18px - long questions
        if (length <= 95) return "text-base"; // 16px - very long questions (note: text-md doesn't exist in Tailwind, using text-base)
        return "text-xs";                      // 12px - extremely long questions
    }

    return (
        <div onClick={canvasTapHandler} className={cn("w-full h-full p-0.5 rounded-[12px]",
            selectionMode === SELECTION_MODE.CANVAS && selectedStyles
        )}>
            <div className="bg-[#196cff] h-full rounded-md relative">
                <JoinQuizCodeTicker />
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] text-light-base">
                    <div onClick={questionTapHandler} className={cn("p-1 rounded-[10px]",
                        selectionMode === SELECTION_MODE.QUESTION && selectedStyles
                    )}>
                        <input
                            value={question}
                            onChange={handleQuestionChange}
                            className={cn(
                                "w-full py-3 px-2 rounded-md transition-all duration-200",
                                getFontSizeClass(question)
                            )}
                            placeholder="Ask your question here"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}