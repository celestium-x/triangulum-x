import HostQuestionPreviewRenderer from './HostQuestionPreviewRenderer';
import HostQuestionPreviewFooter from './HostQuestionPreviewFooter';

export default function HostQuestionPreviewScreen() {
    return (
        <div className="flex h-full w-full relative">
            <HostQuestionPreviewRenderer />
            <HostQuestionPreviewFooter />
        </div>
    );
}
