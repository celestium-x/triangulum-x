import Navbar from '../src/components/navbars/Navbar';
import { cn } from '@/lib/utils';
import LandingPage from '@/components/base/LandingPage';
import { Spotlight } from '@/components/ui/Spotlight';
import Beam from '@/components/ui/svg/Beam';
import FeatureArcComponent from '@/components/base/FeatureArcComponent';

export default function Home() {
    return (
        <div
            className={cn(
                'w-full max-h-screen h-screen relative',
                'bg-light-base dark:bg-dark-primary',
            )}
        >
            <Navbar />
            <Spotlight />
            <div className="pt-30 h-full relative">
                <Beam className="absolute top-30 left-60" />
                <Beam className="absolute top-[40%] right-40 rotate-180" />
                <LandingPage />
                <FeatureArcComponent />
            </div>
        </div>
    );
}
