import { useAllQuizsStore } from "@/store/user/useAllQuizsStore"
import HoverCards from "../ui/HoverCards";

export default function AllQuizComponent() {
    const { quizs } = useAllQuizsStore();
    return (
        <div className="mt-2">
            <HoverCards quizs={quizs} />
        </div>
    )
}