import { cn } from "@/lib/utils";
import { QuestionType } from "@/types/prisma-types";
import { SELECTION_MODE } from "./Canvas";

interface CanvasHeadingProps {
    question: string
    currentQ: QuestionType | undefined;
    handleQuestionChange: (value: string | undefined) => void;
    selectionMode: SELECTION_MODE
    className?: string;
    getFontSizeClass: (text: string) => string;
    questionTapHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function CanvasHeading({ question, currentQ, handleQuestionChange, questionTapHandler, getFontSizeClass, selectionMode }: CanvasHeadingProps) {
    const selectedStyles = "border-2 border-[#5e59b3]";
    return (
        <div
            onClick={questionTapHandler}
            className={cn(
                "p-1 rounded-[10px]",
                selectionMode === SELECTION_MODE.QUESTION && selectedStyles
            )}
            style={{ boxSizing: 'border-box' }}
        >
            <input
                value={currentQ?.question}
                onChange={() => handleQuestionChange(currentQ?.question)}
                className={cn(
                    "w-full py-2 sm:py-3 px-2 rounded-md transition-all duration-200",
                    getFontSizeClass(question)
                )}
                placeholder="Ask your question here"
            />
        </div>

    )
}