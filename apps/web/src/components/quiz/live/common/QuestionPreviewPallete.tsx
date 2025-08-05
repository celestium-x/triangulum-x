import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { BsLightningCharge, BsSpeedometer2, BsTrophy } from "react-icons/bs";

const difficultyIcons: Record<string, React.ReactNode> = {
    easy: <BsSpeedometer2 size={20} className="text-green-500" />,
    medium: <BsLightningCharge size={20} className="text-yellow-500" />,
    hard: <BsTrophy size={20} className="text-red-500" />,
};

interface QuestionPreviewPalleteProps {
    questions: {
        id: string;
        title: string;
        difficulty: string;
    }[];
    theme: string;
    title: string;
}

export default function QuestionPreviewPallete({
    questions,
    theme,
    title,
}: QuestionPreviewPalleteProps) {
    const currentQTemplate = templates.find((t) => t.id === theme);

    return (
        <div
            className={cn(
                "fixed w-full max-w-[23rem] h-full px-6 flex flex-col items-center justify-center gap-y-4",
                currentQTemplate?.background_color || "bg-neutral-200",
                currentQTemplate?.text_color || "text-black"
            )}
        >
            <div className="w-full space-y-4 overflow-y-auto custom-scrollbar">
                {questions.map((q, idx) => (
                    <div key={q.id} className="flex h-[100px] w-full pl-2">
                        <div className="pt-2 mr-4">{idx + 1}.</div>

                        <div className="w-full h-full border rounded-xl relative flex items-center justify-center px-3">
                            <span className="absolute right-3 bottom-3">
                                {difficultyIcons[q.difficulty]}
                            </span>

                            <span className="text-center font-semibold">
                                {q.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
