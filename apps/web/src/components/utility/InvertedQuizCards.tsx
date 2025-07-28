'use client';
import { IoIosPlay } from 'react-icons/io';
import UtilityCard from '../utility/UtilityCard';
import DateActions from '@/lib/dates';
import QuizStatusTicker from '../tickers/QuizstatusTicker';
import { cn } from '@/lib/utils';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAllQuizsStore } from '@/store/user/useAllQuizsStore';
import { useRouter } from 'next/navigation';
import { MouseEvent, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { BiTrash } from 'react-icons/bi';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { MdPublish } from 'react-icons/md';

export default function InvertedQuizCards() {
    const [openQuizOptionId, setOpenQuizOptionId] = useState<string | null>(null);
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { quizs } = useAllQuizsStore();
    const router = useRouter();
    const displayQuizs = quizs.slice(0, 4);

    useHandleClickOutside([dropdownRef], () => setOpenQuizOptionId(null));

    function handleOpenOption(e: MouseEvent<SVGElement>, quizId: string) {
        e.stopPropagation();
        setOpenQuizOptionId(prev => (prev === quizId ? null : quizId));
    }

    return (
        <div className="max-h-[24rem] h-full">
            {quizs.length > 0 && (
                <div className="mt-12 relative w-[20rem] h-fit">
                    <div className="absolute bottom-6 left-3 w-[90%] h-full rounded-3xl bg-dark-base/50 dark:bg-neutral-100/50 scale-95 z-0"></div>
                    <UtilityCard className="relative bg-dark-base dark:bg-neutral-200 max-w-[20rem] w-[20rem] rounded-3xl z-10 shadow-lg border-none transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-0 cursor-pointer">
                        <div className="flex flex-col items-start justify-between h-fit">
                            {displayQuizs.map((quiz, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => router.push(`/new/${quiz.id}`)}
                                    className={cn(
                                        'flex items-start justify-between w-full hover:bg-dark-primary/10 hover:dark:bg-neutral-400/10 px-8 py-2 min-h-[60px] relative',
                                        idx === displayQuizs.length - 1 && 'pb-7',
                                        idx === 0 && 'pt-7',
                                    )}
                                >
                                    <div className="flex-1 min-w-0">
                                        <span className="dark:text-neutral-900 text-neutral-500 text-sm font-medium block truncate">
                                            {quiz.title.slice(0, 28)}...
                                        </span>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="dark:text-neutral-900 text-neutral-300 text-[11px] font-light tracking-wide">
                                                {DateActions.formatFullDateTime(
                                                    new Date(quiz?.scheduledAt ?? Date.now()),
                                                )}
                                            </p>
                                            <QuizStatusTicker
                                                className="scale-80"
                                                status={quiz.status}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mt-4 ml-2 flex-shrink-0">
                                        <BsThreeDotsVertical
                                            onClick={(e) => handleOpenOption(e, quiz.id)}
                                            className="dark:text-neutral-900 text-neutral-500 cursor-pointer"
                                        />

                                        {openQuizOptionId === quiz.id && (
                                            <div
                                                ref={dropdownRef}
                                                className={cn(
                                                    'absolute left-full top-full mt-1',
                                                    'bg-light-base/90 dark:bg-dark-base/90 border border-neutral-200 dark:border-neutral-700',
                                                    'w-[8rem] rounded-md shadow-lg z-[1000]'
                                                )}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <Button
                                                    onClick={() => setSelectedQuizId(quiz.id)}
                                                    className={cn(
                                                        'px-3 py-2 text-dark-base dark:text-neutral-300 w-full bg-transparent hover:bg-transparent cursor-pointer font-light shadow-none',
                                                        'flex items-center justify-between',
                                                    )}
                                                >
                                                    <span className="text-xs">launch</span>
                                                    <IoIosPlay size={12} />
                                                </Button>
                                                <hr className="border-0 h-[0.3px] bg-neutral-300 dark:bg-neutral-700" />
                                                <Button
                                                    onClick={() => setSelectedQuizId(quiz.id)}
                                                    className={cn(
                                                        'px-3 py-2 text-dark-base dark:text-neutral-300 w-full bg-transparent hover:bg-transparent cursor-pointer font-light shadow-none',
                                                        'flex items-center justify-between',
                                                    )}
                                                >
                                                    <span className="text-xs">publish</span>
                                                    <MdPublish size={12} />
                                                </Button>
                                                <hr className="border-0 h-[0.3px] bg-neutral-300 dark:bg-neutral-700" />
                                                <Button
                                                    onClick={() => setSelectedQuizId(quiz.id)}
                                                    className={cn(
                                                        'px-3 py-2 text-red-500 w-full bg-transparent hover:bg-transparent cursor-pointer',
                                                        'flex items-center justify-between',
                                                    )}
                                                >
                                                    <span className="text-xs">delete</span>
                                                    <BiTrash size={12} />
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </UtilityCard>
                </div>
            )}
        </div>
    );
}
