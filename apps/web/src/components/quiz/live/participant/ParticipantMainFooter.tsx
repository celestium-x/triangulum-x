import { cn } from '@/lib/utils';
import ParticipantControls from './ParticipantControls';
import { useLiveQuizExpandableCardForParticipantStore } from '@/store/live-quiz/useLiveQuizExpandableCardForParticipantStore';

export default function ParticipantMainFooter() {
    const { isExpanded, setType } = useLiveQuizExpandableCardForParticipantStore();

    return (
        <div className={cn('absolute bottom-4 right-4 z-100', isExpanded && '-translate-x-[32vw]')}>
            <ParticipantControls
                onClickPeople={() => {
                    setType('PEOPLE');
                }}
                onClickChat={() => {
                    setType('CHAT');
                }}
                onClickLeaderboard={() => {
                    setType('LEADERBOARD');
                }}
                onClickSettings={() => {
                    setType('SETTINGS');
                }}
            />
        </div>
    );
}
