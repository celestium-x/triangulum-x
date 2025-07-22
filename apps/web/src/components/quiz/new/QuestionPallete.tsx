import MiniCanvas from "@/components/canvas/MiniCanvas";
import { Button } from "@/components/ui/button";
import UtilityCard from "@/components/utility/UtilityCard";
import { templates } from "@/lib/templates";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";

export default function QuestionPallete() {
    const { quiz, currentQuestionIndex } = useNewQuizStore();
    const currentQTemplate = templates.find(t => t.id === quiz.theme);

    return (
        <UtilityCard className="max-w-[10rem] flex-shrink-0 shadow-none rounded-sm bg-neutral-200 dark:bg-dark-primary p-0 flex flex-col items-center px-1 border-none">
            <Button className="bg-dark-base dark:bg-neutral-200 rounded-full w-[90%] m-0 mt-4 text-sm px-5">
                Add Question
            </Button>
            <div className="flex flex-col gap-y-1.5 mt-6 w-full">
                {
                    quiz.questions.map((question, idx) => (
                        <MiniCanvas currentQuestionIndex={currentQuestionIndex} template={currentQTemplate} question={question} key={idx} />
                    ))
                }
            </div>
        </UtilityCard>
    )
}