import Navbar from '../src/components/navbars/Navbar';
import { cn } from '@/lib/utils';
import LandingPage from '@/components/base/LandingPage';
import JoinQuizBar from '@/components/base/JoinQuizBar';
import LandingPageCards from '@/components/utility/LandingPageCards';

export default function Home() {
    return (
        <div
            className={cn(
                'w-full max-h-screen h-screen relative',
                'bg-light-base dark:bg-dark-primary',
            )}
        >
            <Navbar />
            <div className="pt-30 h-full">
                <JoinQuizBar />
                <LandingPage />

                <LandingPageCards />
            </div>
        </div>
    );
}
