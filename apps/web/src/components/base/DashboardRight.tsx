import { useHomeRendererStore } from '@/store/home/useHomeRendererStore';
import { HomeRendererEnum } from '@/types/homeRendererTypes';
import { motion } from 'framer-motion';
import { JSX } from 'react';
import HomeDashboard from '../home/HomeDashboard';
import HomeMyQuiz from '../home/HomeMyQuiz';
import HomeCreateQuiz from '../home/HomeCreateQuiz';
import HomeAnalytics from '../home/HomeAnalytics';
import HomeWallet from '../home/HomeWallet';
import HomeLeaderboards from '../home/HomeLeaderboards';
import HomeHistory from '../home/HomeHistory';
import HomeSettings from '../home/HomeSettings';
import HomeHelp from '../home/HomeHelp';
import ReviewBackground from '../utility/ReviewBackground';

export default function DashboardRight(): JSX.Element {
    const { value } = useHomeRendererStore();

    function renderDashboard() {
        switch (value) {
            case HomeRendererEnum.DASHBOARD:
                return <HomeDashboard />;
            case HomeRendererEnum.MY_QUIZ:
                return <HomeMyQuiz />;
            case HomeRendererEnum.CREATE_QUIZ:
                return <HomeCreateQuiz />;
            case HomeRendererEnum.ANALYTICS:
                return <HomeAnalytics />;
            case HomeRendererEnum.WALLET:
                return <HomeWallet />;
            case HomeRendererEnum.LEADERBOARD:
                return <HomeLeaderboards />;
            case HomeRendererEnum.HISTORY:
                return <HomeHistory />;
            case HomeRendererEnum.SETTINGS:
                return <HomeSettings />;
            case HomeRendererEnum.HELP:
                return <HomeHelp />;
            case HomeRendererEnum.REVIEW:
                return <ReviewBackground />;
            default:
                return <div>Dashboard</div>;
        }
    }

    return (
        <motion.div
            className="flex-1 h-full overflow-hidden bg-neutral-50 dark:bg-dark-primary/30 border-l-[1px] border-t-[1px] border-neutral-300 dark:border-neutral-700 rounded-tl-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mt-[5rem] flex flex-col gap-y-4">{renderDashboard()}</div>
        </motion.div>
    );
}
