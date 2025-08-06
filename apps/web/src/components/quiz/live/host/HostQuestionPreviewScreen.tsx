import HostQuestionPreviewRenderer from './HostQuestionPreviewRenderer';
import HostQuestionReviewFooter from './HostQuestionReviewFooter';

export default function HostQuestionPreviewScreen() {
    return (
        <div className="flex h-full w-full relative">
            <HostQuestionPreviewRenderer />
            <HostQuestionReviewFooter />
        </div>
    );
}
