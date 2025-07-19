import { TbPlus } from "react-icons/tb";
import HeadAndSubHead from "../content/HeadAndSubHead";
import UtilityCard from "../utility/UtilityCard";

export default function HomeCreateQuiz() {
    return (
        <div className="flex flex-col items-start justify-start">
            <HeadAndSubHead
                heading="Create Quiz"
                subHeading="Manage your quizzes, analytics, and more"
            />
            <div className="mt-4">
                <UtilityCard className="min-w-[20rem] min-h-[10rem] max-w-[20rem] max-h-[10rem] flex flex-col items-center justify-center rounded-xl shadow-md border border-dashed cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 group">
                    <div className="flex items-center justify-center gap-x-2">
                        <TbPlus size={16} />
                        <span className="text-sm dark:text-neutral-300 text-neutral-800 font-light">
                            Create Quiz
                        </span>
                    </div>
                </UtilityCard>
            </div>
        </div>
    );
}