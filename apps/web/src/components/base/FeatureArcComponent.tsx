import { ArcTimelineDemo } from '../ui/ArcTimeline';

export default function FeatureArcComponent() {
    return (
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black,transparent)] mt-[12rem] select-none">
            <div className="w-full flex items-center justify-center gap-x-2">
                <span className="text-5xl text-transparent font-semibold bg-clip-text bg-gradient-to-b dark:from-neutral-100 via-neutral-400 to-neutral-900">
                    Where Knowledge Meets
                </span>
                <span className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-b dark:from-primary dark:via-primary dark:to-neutral-900">
                    Rewards
                </span>
            </div>
            <ArcTimelineDemo />
        </div>
    );
}
