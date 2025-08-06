'use client';
import Image from 'next/image';
import { User } from '../specTypes';
import UtilityCard from '@/components/utility/UtilityCard';
import { useLiveSpectatorsStore } from '@/store/live-quiz/useLiveSpectatorStore';
import { cn } from '@/lib/utils';

interface SpectatorsDisplayProps {
    users: User[];
    onSelectUser: (user: User) => void;
    ref: React.RefObject<HTMLDivElement | null>;
}

export default function SpectatorsDisplay({ users, onSelectUser, ref }: SpectatorsDisplayProps) {
    const { currentUserId } = useLiveSpectatorsStore();

    return (
        <UtilityCard
            ref={ref}
            key="people-list"
            className="fixed bottom-22 right-28 h-full p-0 z-40 max-h-[500px] dark:bg-neutral-900 border shadow-xl rounded-2xl rounded-br-none w-[20rem] overflow-hidden"
        >
            <div className="overflow-y-auto h-full max-h-[500px] custom-scrollbar overflow-hidden flex justify-around pt-4 pb-2">
                <div className="grid gap-3 grid-cols-3 grid-rows-5">
                    {users.map((user) => (
                        <div
                            key={`${user.id}-${user.name}`}
                            onClick={() => onSelectUser(user)}
                            className="flex flex-col items-center hover:-translate-y-1 p-2 rounded-xl transition w-20 col-span-1"
                        >
                            <div
                                className={cn(
                                    'size-11 rounded-full overflow-hidden',
                                    'border',
                                    currentUserId === user.id
                                        ? 'border-purple-500'
                                        : 'border-neutral-700',
                                )}
                            >
                                {user.avatar && (
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={48}
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
                            <div className="text-[10px] text-neutral-100 text-center truncate w-full">
                                {user.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UtilityCard>
    );
}
