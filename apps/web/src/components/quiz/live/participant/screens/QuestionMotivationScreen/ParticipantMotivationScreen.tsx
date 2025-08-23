'use client';

import { JSX } from 'react';
import { motion } from 'framer-motion';
import { ClockFading } from 'lucide-react';
import { useLiveParticipantStore } from '@/store/live-quiz/useLiveQuizUserStore';
import Avatar from '@/components/waitingRoom/Avatar';

export default function ParticipantMotivationScreen(): JSX.Element {
    const { participantData } = useLiveParticipantStore();
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
                        <span className="text-sm">Are you ready {participantData?.nickname}!</span>
                        <span>Respond quickly to get more points!</span>
                    </motion.span>
                    {participantData?.avatar && (
                        <Avatar
                            avatar={participantData.avatar}
                            name={participantData.nickname}
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
