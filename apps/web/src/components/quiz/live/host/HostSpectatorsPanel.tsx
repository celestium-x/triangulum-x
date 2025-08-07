'use client';

import { Button } from '@/components/ui/button';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { useLiveSpectatorsStore } from '@/store/live-quiz/useLiveSpectatorsStore';
import { useUserSessionStore } from '@/store/user/useUserSessionStore';
import { SpectatorType } from '@/types/prisma-types';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { GET_SPECTATOR_ON_CALL_URL } from 'routes/api_routes';

interface SpectatorResponseProps {
    spectators: SpectatorType[];
    hasMore: boolean;
    success: boolean;
}

export default function HostSpectatorsPanel() {
    const { quiz } = useLiveQuizStore();
    const { session } = useUserSessionStore();
    const { spectators, setSpectators, upsertSpectator } = useLiveSpectatorsStore();

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const quizId = quiz?.id;

    const fetchSpectators = useCallback(
        async (pageNum: number) => {
            if (!quizId || loading || !hasMore || !session?.user.token) return;

            setLoading(true);
            try {
                const response = await axios.get<SpectatorResponseProps>(
                    GET_SPECTATOR_ON_CALL_URL(quizId, pageNum),
                    {
                        headers: {
                            Authorization: `Bearer ${session.user.token}`,
                        },
                    },
                );

                const data = response.data;

                if (data.success) {
                    if (pageNum === 0) {
                        setSpectators(data.spectators);
                    } else {
                        data.spectators.forEach(upsertSpectator);
                    }
                    setHasMore(data.hasMore);
                    setPage(pageNum + 1);
                }
            } catch (err) {
                console.error('Failed to fetch spectators:', err);
            } finally {
                setLoading(false);
            }
        },
        [
            quizId,
            loading,
            hasMore,
            session?.user.token,
            setSpectators,
            upsertSpectator,
            setPage,
            setHasMore,
        ],
    );

    useEffect(() => {
        if (quizId) {
            fetchSpectators(0);
        }
    }, [quizId, fetchSpectators]);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container || loading || !hasMore) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            fetchSpectators(page);
        }
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center px-7 py-4 border-b">
                <span className="text-sm dark:text-light-base text-dark-primary">Spectators</span>
                <ToolTipComponent content="Click to expand">
                    <div>
                        <Button
                            className="text-dark-base dark:text-light-base cursor-pointer dark:bg-neutral-600/30"
                            variant="ghost"
                        >
                            <IoSearch className="dark:text-light-base" strokeWidth={0.5} />
                        </Button>
                    </div>
                </ToolTipComponent>
            </div>

            <div
                className="w-full h-full p-4 overflow-y-auto custom-scrollbar"
                ref={containerRef}
                onScroll={handleScroll}
            >
                <div className="grid grid-cols-3 gap-6 px-4 py-3">
                    {spectators.map((spectator) => (
                        <div
                            key={spectator.id}
                            className="flex flex-col items-center text-center hover:-translate-y-0.5 transition-all transform duration-200 ease-in-out"
                        >
                            <Image
                                src={spectator.avatar || '/default-avatar.png'}
                                alt="userImage"
                                width={56}
                                height={56}
                                className="rounded-full border w-14 h-14 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/default-avatar.png';
                                }}
                            />
                            <span className="mt-2 text-[13px] text-dark-primary dark:text-neutral-300 break-words max-w-[5rem]">
                                {spectator.nickname?.split(' ')[0]}
                            </span>
                        </div>
                    ))}
                </div>

                {loading && (
                    <div className="text-sm text-neutral-600 text-center mt-4">Loading...</div>
                )}

                {!loading && spectators.length === 0 && (
                    <div className="text-xs text-neutral-600 text-center mt-4">
                        No spectators have joined yet
                    </div>
                )}

                {!loading && spectators.length > 0 && !hasMore && (
                    <div className="text-xs text-neutral-600 text-center mt-4">
                        No more spectators
                    </div>
                )}
            </div>
        </div>
    );
}
