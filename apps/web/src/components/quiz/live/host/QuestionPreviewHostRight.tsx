import { cn } from '@/lib/utils';
import HostQuestionPreviewRightCanvas from './HostQuestionPreviewRightCanvas';

export default function QuestionPreviewHostRight() {
    return (
        <div className={cn('w-full h-full flex justify-center items-center ')}>
            <HostQuestionPreviewRightCanvas />
        </div>
    );
}
