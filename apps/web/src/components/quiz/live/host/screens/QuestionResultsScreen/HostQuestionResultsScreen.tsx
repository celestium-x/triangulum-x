import HostQuestionResultScreenFooter from '../QuestionReadingScreen/HostQuestionResultScreenFooter';
import HostQuestionResultsRenderer from './HostQuestionResultsRenderer';

export default function HostQuestionResultsScreen() {
    return (
        <div className="flex h-full w-full relative ">
            <HostQuestionResultsRenderer />
            <HostQuestionResultScreenFooter />
        </div>
    );
}
