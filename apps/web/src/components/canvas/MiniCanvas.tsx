import { Template } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { QuestionType } from "@/types/prisma-types";
import CanvasAccents from "../utility/CanvasAccents";

interface MiniCanvasProps {
    template: Template | undefined;
    question: QuestionType;
    currentQuestionIndex: number;
    questionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
}

export default function MiniCanvas({ template, question, currentQuestionIndex, questionIndex, setCurrentQuestionIndex }: MiniCanvasProps) {
    const selectedStyles = "border-2 border-[#5e59b3]";
    
    return (
        <div
            onClick={() => setCurrentQuestionIndex(question.orderIndex)}
            className={cn(
                "w-full rounded-md h-18 p-0.5 cursor-pointer",
                currentQuestionIndex === question.orderIndex && selectedStyles
            )}
            style={{ boxSizing: 'border-box' }}
        >
            <div
                style={{
                    backgroundColor: template?.background_color,
                    color: template?.text_color,
                }}
                className="w-full h-full rounded-sm flex items-center justify-center overflow-hidden relative group"
            >
                <div className="text-[5px] text-center text-light-base bg-dark-base rounded-full absolute top-2 left-2 px-2 py-1 hidden group-hover:block">
                    Question {questionIndex + 1}
                </div>
                <CanvasAccents design={template?.accent_type} accentColor={template?.accent_color} />
                <div className="text-xs">
                    {question.question.slice(0, 10)}...
                </div>
            </div>
        </div>
    )
}