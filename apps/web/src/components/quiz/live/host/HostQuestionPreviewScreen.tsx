import QuestionPreviewHostLeft from "./QuestionPreviewHostLeft";
import QuestionPreviewHostRight from "./QuestionPreviewHostRight";

export default function HostQuestionPreviewScreen() {
    return (
        <div className="flex h-full w-full">
            <QuestionPreviewHostLeft/>
            <QuestionPreviewHostRight/>
        </div>
    )
}