import MiniCanvas from "@/components/canvas/MiniCanvas";
import { Button } from "@/components/ui/button";
import UtilityCard from "@/components/utility/UtilityCard";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";
import { TbPlus } from 'react-icons/tb'

export default function QuestionPallete() {
    const { quiz, currentQuestionIndex } = useNewQuizStore();
    const currentQTemplate = templates.find(t => t.id === quiz.theme);

    return (
        <UtilityCard className="max-w-[10rem] w-full flex-shrink-0 shadow-none rounded-sm bg-neutral-200 dark:bg-dark-primary p-0 flex flex-col items-center px-1 border-none">
            <Button className={cn("bg-dark-base dark:bg-neutral-200 dark:hover:bg-light-base hover:bg-dark-primary ",
                'rounded-full m-0 mt-4 px-20 text-xs font-light flex items-center justify-center gap-x-2'
            )}>
                <TbPlus />
                <span>Add Question</span>
            </Button>
            <div className="flex flex-col gap-y-1.5 mt-6 w-full">
                {
                    quiz.questions.map((question, idx) => (
                        <div key={idx} className="flex items-end gap-x-2">
                            <div className="text-xs">{idx + 1}.</div>
                            <MiniCanvas currentQuestionIndex={currentQuestionIndex} template={currentQTemplate} question={question} questionIndex={idx} />
                        </div>
                    ))
                }
            </div>
        </UtilityCard>
    )
}