import { cn } from '@/lib/utils';
import SpectatorControls from './SpectatorControls';
import { useLiveQuizExpandableCardForSpectatorStore } from '@/store/live-quiz/useLiveQuizExpandableCardForParticipantStore';

export default function SpectatorMainFooter() {
    const { setType, isExpanded } = useLiveQuizExpandableCardForSpectatorStore();
    return (
        <div className={cn('absolute bottom-4 right-4 z-100', isExpanded && '-translate-x-[36vw]')}>
            <SpectatorControls
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
