'use client';
import { JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import Avatar from '@/components/waitingRoom/Avatar';
import { useLiveParticipantStore } from '@/store/live-quiz/useLiveQuizUserStore';
import { templates } from '@/lib/templates';

const ONE_SECOND = 1000;
const TOTAL_TIME = 5;

export default function ParticipantQuestionReadingScreen(): JSX.Element {
    const [timer, setTimer] = useState<number>(TOTAL_TIME);
    const [progress, setProgress] = useState<number>(0);
    const { participantData } = useLiveParticipantStore();
    const { quiz } = useLiveQuizStore();
    const template = templates.find((t) => t.id === quiz?.theme);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                const newTimer = prev - 1;
                if (newTimer <= 0) {
                    clearInterval(interval);
                    setProgress(100);
                    return 0;
                }
                return newTimer;
            });

            setProgress((prev) => {
                const newProgress = prev + 100 / TOTAL_TIME;
                return Math.min(newProgress, 100);
            });
        }, ONE_SECOND);

        return () => clearInterval(interval);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full relative flex items-center justify-center"
        >
            <div className="absolute top-0 left-0 w-full h-1">
                <div
                    className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: template?.bars[3],
                    }}
                />
            </div>
            <div className="max-w-3xl h-[500px] sm:h-[550px] lg:h-[550px] flex flex-col items-center justify-start gap-y-20 flex-shrink-0">
                <div className="flex-1 flex flex-col justify-between items-center my-12">
                    <span className="text-2xl tracking-wider font-light leading-relaxed text-wrap">
                        {
                            "In a React component, what's the difference between using useEffect(() => {...}, []) and useLayoutEffect(() => {...}, [])? When would you prefer one over the other?"
                        }
                    </span>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                        }}
                        className="text-3xl font-extralight tracking-wider flex flex-col items-center gap-y-4"
                    >
                        <div className="font-bold text-7xl">{timer}</div>
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
