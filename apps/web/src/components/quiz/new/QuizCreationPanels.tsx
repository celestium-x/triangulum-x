'use client'
import QuizLeft from "@/components/quiz/new/QuizLeft"
import QuizRight from "@/components/quiz/new/QuizRight"

export default function QuizCreationPanels() {
    return (
        <div className="w-full h-full flex flex-row dark:bg-dark-primary bg-neutral-200 overflow-hidden">
            <QuizLeft />
            <QuizRight />
        </div>
    )
}