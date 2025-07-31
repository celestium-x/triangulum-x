import HeadAndSubHead from '../content/HeadAndSubHead';
import DashboardStakedAmountCard from '../utility/DashboardStakedAmountCard';
import InvertedQuizCards from '../utility/InvertedQuizCards';

export default function HomeDashboard() {
    return (
        <div className="p-8 relative">
            <HeadAndSubHead
                heading="Dashboard"
                subHeading="Manage your quizzes, analytics, and more"
            />
            <div className="flex flex-col items-start lg:flex-row lg:gap-x-12 lg:items-center gap-4 h-[24rem]">
                <InvertedQuizCards />
                <DashboardStakedAmountCard />
            </div>
        </div>
    );
}
