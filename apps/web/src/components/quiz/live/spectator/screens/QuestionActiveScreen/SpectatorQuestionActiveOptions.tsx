import { getResponsiveGap } from '@/components/canvas/CanvasOptions';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';

type Hex = `#${string}`;

export default function SpectatorQuestionActiveOptions() {
    const { currentQuestion, quiz: liveQuiz } = useLiveQuizStore();
    const template = templates.find((t) => t.id === liveQuiz?.theme);
    if (!currentQuestion) return null;

    const maxHeight = 12;

    const barColors = template?.bars ?? (['#3b82f6'] as Hex[]);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-5 p-8 rounded-xl z-50">
            <div
                className={cn(
                    'w-full h-full flex items-end justify-center',
                    getResponsiveGap(currentQuestion),
                )}
            >
                {currentQuestion.options.map((option, idx) => {
                    const color = barColors[idx % barColors.length] as Hex;
                    return (
                        <div key={idx} className="flex flex-col gap-y-2 w-full">
                            <div
                                className={cn(
                                    'group relative isolate flex w-full select-none items-stretch overflow-hidden rounded-2xl',
                                    'border border-white/10 bg-white/[0.03] transition-transform',
                                    'hover:-translate-y-0.5 active:translate-y-0',
                                )}
                                style={{
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                                    backgroundColor: template?.background_color,
                                }}
                            >
                                <div className="w-3" style={{ backgroundColor: color }} />

                                <div className="flex min-h-[64px] flex-1 items-center gap-10 px-4 md:gap-4 md:px-5">
                                    <div className="flex-1">
                                        <div className="text-sm md:text-base">{option}</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-end h-full flex-1 min-w-0 px-1"
                            >
                                <div
                                    className="w-full rounded-tr-md sm:rounded-tr-2xl transition-all duration-700 ease-in-out border border-white/20 z-50"
                                    style={{
                                        height: `${maxHeight}px`,
                                        backgroundColor: template?.bars[idx] || '#4F46E5',
                                    }}
                                />
                                <div className="mt-1 sm:mt-2 min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-center w-full">
                                    <div className="text-xs sm:text-sm text-center px-0.5 sm:px-1 leading-tight font-light break-words">
                                        <span className="hidden sm:inline">{option}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
