import CreateQuizNavBar from "@/components/navbars/CreateQuizNavbar"
import QuizCreationPanels from "@/components/quiz/new/QuizCreationPanels"

export interface NewProps {
    params: {
        quizId: string
    }
}

export default function New() {
    return (
        <div className="h-screen max-h-screen w-full max-w-screen dark:bg-dark-primary bg-light-base">
            <CreateQuizNavBar />
            <QuizCreationPanels />
        </div>
    )
}