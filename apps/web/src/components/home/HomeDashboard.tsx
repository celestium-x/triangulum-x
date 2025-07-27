import HeadAndSubHead from '../content/HeadAndSubHead';
import InvertedQuizCards from '../utility/InvertedQuizCards';

export default function HomeDashboard() {
    return (
        <div className="p-8 relative">
            <HeadAndSubHead
                heading="Dashboard"
                subHeading="Manage your quizzes, analytics, and more"
            />
            <InvertedQuizCards />
        </div>
    );
}
