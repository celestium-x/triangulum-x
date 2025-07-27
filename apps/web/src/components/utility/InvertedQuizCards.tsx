import UtilityCard from '../utility/UtilityCard';
import DateActions from '@/lib/dates';
import QuizStatusTicker from '../tickers/QuizstatusTicker';
import { cn } from '@/lib/utils';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useAllQuizsStore } from '@/store/user/useAllQuizsStore';
import { useRouter } from 'next/navigation';

export default function InvertedQuizCards() {
    const { quizs } = useAllQuizsStore();
    const router = useRouter();

    return (
        <div>
            {quizs.length > 0 && (
                <div className="mt-12 relative w-[20rem]">
                    <div className="absolute bottom-6 left-3 w-[90%] h-full rounded-3xl bg-dark-base/50 dark:bg-neutral-100/50 scale-95 z-0"></div>
                    <UtilityCard className="relative bg-dark-base dark:bg-neutral-200 max-w-[20rem] rounded-3xl z-10 shadow-lg border-none transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-0 overflow-hidden cursor-pointer">
                        <div className="flex flex-col items-start justify-between">
                            {quizs.map((quiz, idx) => (
                                <div
                                    onClick={() => router.push(`/new/${quiz.id}`)}
                                    key={idx}
                                    className={cn(
                                        'flex items-start justify-between w-full hover:bg-dark-primary/10 hover:dark:bg-neutral-400/10 px-8 py-2',
                                        idx === quizs.length - 1 && 'pb-7',
                                        idx === 0 && 'pt-7',
                                    )}
                                >
                                    <div className="">
                                        <span className="dark:text-neutral-900 text-neutral-500 text-sm font-medium">
                                            {quiz.title.slice(0, 28)}...
                                        </span>
                                        <div className="flex items-center justify-between">
                                            <p className="dark:text-neutral-900 text-neutral-300 text-[11px] font-light tracking-wide">
                                                {DateActions.formatFullDateTime(
                                                    new Date(quiz?.scheduledAt ?? Date.now())
                                                )}
                                            </p>
                                            <QuizStatusTicker
                                                className="scale-80"
                                                status={quiz.status}
                                            />
                                        </div>
                                    </div>
                                    <BsThreeDotsVertical className="dark:text-neutral-900 text-neutral-500 mt-4" />
                                </div>
                            ))}
                        </div>
                    </UtilityCard>
                </div>
            )}
        </div>
    );
}
