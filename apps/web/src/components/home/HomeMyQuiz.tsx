import { useEffect } from "react";
import HeadAndSubHead from "../content/HeadAndSubHead";
import axios from "axios";
import { GET_ALL_OWNER_QUIZ_URL } from "routes/api_routes";
import { useUserSessionStore } from "@/store/user/useUserSessionStore";
import { useAllQuizsStore } from "@/store/user/useAllQuizsStore";
import AllQuizComponent from "../base/AllQuizComponent";

export default function HomeMyQuiz() {
    const { session } = useUserSessionStore();
    const { setAllQuizs } = useAllQuizsStore();

    useEffect(() => {
        async function getUserAllQuizs() {
            if (!session?.user.token) return;
            try {
                const { data } = await axios.get(GET_ALL_OWNER_QUIZ_URL, {
                    headers: {
                        Authorization: `Bearer ${session?.user.token}`
                    }
                })
                if (data.success) {
                    setAllQuizs(data.quizzes);
                }
            } catch (err) {
                console.error("Error in getting all the quizzes", err);
            }
        }

        getUserAllQuizs();
    }, [session?.user.token, setAllQuizs])

    return (
        <div className="p-8">
            <HeadAndSubHead
                heading="My Quizzes"
                subHeading="Manage your quizzes, analytics, and more"
            />
            <AllQuizComponent />
        </div>
    )
}