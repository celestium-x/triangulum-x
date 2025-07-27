import HeadAndSubHead from '../content/HeadAndSubHead';
import AllQuizComponent from '../base/AllQuizComponent';

export default function HomeMyQuiz() {
    return (
        <div className="p-8">
            <HeadAndSubHead
                heading="My Quizzes"
                subHeading="Manage your quizzes, analytics, and more"
            />
            <AllQuizComponent />
        </div>
    );
}
