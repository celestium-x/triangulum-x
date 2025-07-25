"use client"
import CreateQuizNavBar from "@/components/navbars/CreateQuizNavbar"
import QuizCreationPanels from "@/components/quiz/new/QuizCreationPanels"
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore"
import { useUserSessionStore } from "@/store/user/useUserSessionStore"
import axios from "axios"
import { useEffect, useState } from "react"
import { GET_OWNER_QUIZ_URL } from "routes/api_routes"

export interface NewProps {
    params: {
        quizId: string
    }
}

export default function New({ params }: NewProps) {
    const { quizId } = params;
    const { session } = useUserSessionStore();
    const { updateQuiz } = useNewQuizStore();
    const [ allowance, setAllowance ] = useState<"LOADING" | "ALLOWED" | "NOT_ALLOWED" | "NONE">("NONE");

    useEffect(() => {
        const fetchQuiz = async () => {
            setAllowance("LOADING");
            try {
                const response = await axios.get(`${GET_OWNER_QUIZ_URL}/${quizId}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.token}`
                    }
                })
                if (response.data.success) {

                    switch (response.data.value) {
                        case "QUIZ_NOT_EXIST":
                            setAllowance("ALLOWED");
                            break;
                        case "NOT_AUTHORIZED":
                            setAllowance("NOT_ALLOWED");
                            break;
                        case "QUIZ_FOUND":
                            setAllowance("ALLOWED");
                            updateQuiz(response.data.quiz);
                            break;
                    }
                }

            } catch (error) {
                console.error("Error while fetching quiz", error);
            }
        }

        if (session?.user.token) {
            fetchQuiz();
        }

    }, [quizId, session?.user.token, updateQuiz])


    return (
        <div className="h-screen max-h-screen w-full max-w-screen dark:bg-dark-primary bg-light-base flex flex-col">
            <div className="h-20 ">
                <CreateQuizNavBar />
            </div>
            {(allowance === "ALLOWED") && (<QuizCreationPanels quizId={quizId}/>) }
        </div>
    )
}