import UtilityCard from '@/components/utility/UtilityCard';
import { templates } from '@/lib/templates';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import { JSX } from 'react';
import { FaLightbulb } from 'react-icons/fa6';

export default function ParticipantQuestionActiveFooter(): JSX.Element {
    const { currentQuestion, quiz } = useLiveQuizStore();
    const template = templates.find((t) => t.id === quiz?.theme);
    
    return (
        <div
            style={{
                color: template?.text_color,
            }}
            className="absolute bottom-4 left-4 z-100 flex items-center justify-start gap-x-4 w-fit"
        >
            {currentQuestion?.hint && (
                <UtilityCard className="flex items-center justify-center gap-x-2">
                    <FaLightbulb
                        strokeWidth={0.8}
                        style={{
                            border: `1px solid ${template?.border_color}50`,
                            backgroundColor: `${template?.text_color}20`,
                        }}
                        size={26}
                        className="rounded-full p-1.5 cursor-pointer"
                    />
                    <div
                        style={{
                            color: template?.text_color,
                        }}
                        className="text-xs"
                    >
                        {currentQuestion.hint}
                    </div>
                </UtilityCard>
            )}
        </div>
    );
}
