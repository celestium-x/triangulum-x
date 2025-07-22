import { Template } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { QuestionType } from "@/types/prisma-types";

interface MiniCanvasProps {
    template: Template | undefined;
    question: QuestionType;
    currentQuestionIndex: number;
}

export default function MiniCanvas({ template, question, currentQuestionIndex }: MiniCanvasProps) {
    const selectedStyles = "border-2 border-[#5e59b3]";
    return (
        <div className={cn("w-full rounded-md h-16 p-0.5",
            currentQuestionIndex === question.orderIndex && selectedStyles
        )}>
            <div
                style={{
                    backgroundColor: template?.background_color,
                    color: template?.text_color,
                }}
                className="w-full h-full rounded-sm flex items-center justify-center"
            >
                <div className="text-xs">
                    {question.question.slice(0, 10)}...
                </div>
            </div>
        </div>
    )
}