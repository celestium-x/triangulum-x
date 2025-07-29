import HeadAndSubHead from '../content/HeadAndSubHead';
import DashboardStakedAmountCard from '../utility/DashboardStakedAmountCard';
import InvertedQuizCards from '../utility/InvertedQuizCards';

export default function HomeDashboard() {
    return (
        <div className="p-6 md:p-8 relative">
            <HeadAndSubHead
                heading="Dashboard"
                subHeading="Manage your quizzes, analytics, and more"
            />
            <div className="flex-col sm:flex gap-4 h-[24rem]">
                <DashboardStakedAmountCard />
                <InvertedQuizCards />
            </div>
        </div>
    );
}
