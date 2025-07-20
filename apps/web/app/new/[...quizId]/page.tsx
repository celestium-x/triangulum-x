import Navbar from "@/components/navbars/Navbar"
import QuizCreationPanels from "@/components/quiz/new/QuizCreationPanels"

interface NewProps {
    params: {
        quizId: string
    }
}

export default function New({ params }: NewProps) {
    return (
        <div className="h-screen max-h-screen w-full max-w-screen dark:bg-dark-primary bg-light-base"> 
            <Navbar />
            <QuizCreationPanels />
        </div>
    )
}