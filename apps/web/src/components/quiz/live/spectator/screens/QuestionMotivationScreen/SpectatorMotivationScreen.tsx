'use client';

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { ClockFading } from 'lucide-react';
import { useLiveSpectatorStore } from '@/store/live-quiz/useLiveQuizUserStore';
import Avatar from '@/components/waitingRoom/Avatar';

export default function SpectatorMotivationScreen(): JSX.Element {
    const { spectatorData } = useLiveSpectatorStore();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full relative flex items-center justify-center"
        >
            <div className="max-w-4xl h-[500px] sm:h-[550px] lg:h-[550px] flex flex-col items-center justify-start gap-y-20 flex-shrink-0">
                <div className="flex-1 flex flex-col justify-between items-center my-12">
                    <ClockFading size={35} />
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                        }}
                        className="text-3xl font-extralight tracking-wider flex flex-col items-center gap-y-4"
                    >
                        <span className="text-sm">Are you ready {spectatorData?.nickname}!</span>
                        <span>Fuel the quiz with your cheers!</span>
                    </motion.span>
                    {spectatorData?.avatar && (
                        <Avatar
                            avatar={spectatorData.avatar}
                            name={spectatorData.nickname}
                            position={{ x: 0, y: 0 }}
                            index={0}
                            size={100}
                            showOnlineIndicator={true}
                            showNameTooltip={true}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
}
