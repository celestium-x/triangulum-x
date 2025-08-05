import QuestionPreviewHostLeft from './QuestionPreviewHostRight';
import QuestionPreviewHostRight from './QuestionPreviewHostLeft';

export default function HostQuestionPreviewScreen() {
    return (
        <div className="flex h-full w-full">
            <QuestionPreviewHostLeft />
            <QuestionPreviewHostRight />
        </div>
    );
}
