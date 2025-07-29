import { useHomeRendererStore } from '@/store/home/useHomeRendererStore';
import OpacityBackground from './OpacityBackground';
import UtilityCard from './UtilityCard';
import { HomeRendererEnum } from '@/types/homeRendererTypes';

export default function ReviewBackground() {
    const { setValue } = useHomeRendererStore();
    return (
        <OpacityBackground
            className="bg-dark-primary/90"
            onBackgroundClick={() => setValue(HomeRendererEnum.DASHBOARD)}
        >
            <UtilityCard className="dark:bg-neutral-950 w-full max-w-[70vw] max-h-[80vh] h-full relative overflow-hidden border dark:border-neutral-800">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle 40vw at 50% 0%, 
                            rgba(142, 70, 243, 0.5) 0%, 
                            rgba(142, 70, 243, 0.25) 30%, 
                            rgba(142, 70, 243, 0.1) 50%, 
                            transparent 70%)`,
                    }}
                />
                <div className="absolute top-30 left-1/2 -translate-x-1/2">
                    <span
                        className="text-[#a885d6] text-9xl font-bold tracking-wide capitalize relative block"
                        style={{
                            background: `linear-gradient(to bottom, 
                                rgb(129, 103, 163) 20%,
                                rgb(129, 103, 163) 20%,
                                rgba(129, 103, 163, 0.7) 40%,
                                rgba(129, 103, 163, 0.3) 60%, 
                                rgba(129, 103, 163, 0.05) 80%,
                                transparent 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        REVIEW
                    </span>
                </div>
                <div></div>
            </UtilityCard>
        </OpacityBackground>
    );
}
