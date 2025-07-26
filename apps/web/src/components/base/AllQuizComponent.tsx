import { useAllQuizsStore } from "@/store/user/useAllQuizsStore"
import HoverCards from "../ui/HoverCards";

export default function AllQuizComponent() {
    const { quizs } = useAllQuizsStore();
    return (
        <div>
            <div>
                <HoverCards quizs={quizs} />
            </div>
        </div>
    )
}