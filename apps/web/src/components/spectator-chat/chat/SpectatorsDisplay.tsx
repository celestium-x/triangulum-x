'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { User } from '../specTypes';
import UtilityCard from '@/components/utility/UtilityCard';
import { useLiveSpectatorsStore } from '@/store/live-quiz/useLiveSpectatorStore';
import { cn } from '@/lib/utils';

interface SpectatorsDisplayProps {
    users: User[];
    onSelectUser: (user: User) => void;
}

export default function SpectatorsDisplay({ users, onSelectUser }: SpectatorsDisplayProps) {
    const { currentUserId } = useLiveSpectatorsStore();

    return (
        <AnimatePresence>
            <UtilityCard
                key="people-list"
                className="fixed bottom-22 right-28 h-full p-0 z-40 max-h-[500px] bg-neutral-900 border shadow-xl rounded-2xl rounded-br-none w-[20rem] overflow-hidden"
            >
                <div className="overflow-y-auto h-full max-h-[500px] custom-scrollbar overflow-hidden pt-4 pb-2">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {users.map((user) => (
                            <button
                                key={`${user.id}-${user.name}`}
                                onClick={() => onSelectUser(user)}
                                className="flex flex-col items-center hover:-translate-y-1 p-2 rounded-xl transition w-20"
                            >
                                <div
                                    className={cn(
                                        'w-14 h-14 rounded-full overflow-hidden',
                                        `${currentUserId === user.id ? 'border border-purple-500' : 'border border-neutral-700'}`,
                                    )}
                                >
                                    {user.avatar && (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={56}
                                            height={56}
                                            className="object-cover w-full h-full"
                                        />
                                    )}

                                    {user.svg && (
                                        <div className="w-full flex justify-center items-center h-full">
                                            {user.svg}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 text-xs text-neutral-100 text-center truncate w-full">
                                    {user.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </UtilityCard>
        </AnimatePresence>
    );
}
