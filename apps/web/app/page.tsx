import Navbar from '../src/components/navbars/Navbar';
import { cn } from '@/lib/utils';
import LandingPage from '@/components/base/LandingPage';
import { Spotlight } from '@/components/ui/Spotlight';
import Beam from '@/components/ui/svg/Beam';
import FeatureBox from '@/components/base/FeatureBox';
import HomeScreenJoinQuizButton from '@/components/base/HomeScreenJoinQuizButton';
import CustomFeatureComponent from '@/components/base/CustomFeatureComponent';
import HomeScreenFooter from '@/components/base/HomeScreenFooter';
import FeatureArcComponent from '@/components/base/FeatureArcComponent';

export default function Home() {
  return (
    <div
      className={cn(
        'w-full h-full relative',
        'bg-light-base dark:bg-dark-primary flex flex-col gap-y-30',
      )}
    >
      <Spotlight />
      <Navbar />
      <div className="w-full max-w-7xl mx-auto">
        <div className="pt-24 h-full relative">
          <Beam className="absolute top-40 left-10" />
          <Beam className="absolute top-90 right-10 rotate-180" />
          <LandingPage />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <FeatureBox />
        <CustomFeatureComponent />
        <FeatureArcComponent />
      </div>
      <div className="fixed bottom-6 right-8 z-90">
        <HomeScreenJoinQuizButton />
      </div>
      <div className="w-full flex items-center justify-center">
        <div
          className="text-[14rem] font-medium text-center 
                    bg-gradient-to-b from-[rgba(116,74,199,0.3)] via-[rgba(116,74,199,0.1)] 
                    to-white/10 dark:to-[#01011220] bg-clip-text text-transparent"
        >
          NOCTURN
        </div>
      </div>
      <HomeScreenFooter />
    </div>
  );
}
