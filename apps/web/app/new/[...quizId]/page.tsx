import CreateQuizNavBar from "@/components/navbars/CreateQuizNavbar"
import QuizCreationPanels from "@/components/quiz/new/QuizCreationPanels"

export interface NewProps {
    params: {
        quizId: string
    }
}

export default function New({ params }: NewProps) {
    const { quizId } = params;
    return (
        <div className="h-screen max-h-screen w-full max-w-screen dark:bg-dark-primary bg-light-base flex flex-col">
            <div className="h-20 ">
                <CreateQuizNavBar />
            </div>
            <QuizCreationPanels quizId={quizId} />
        </div>
    )
}