import HostControls from './HostControls';
import { useLiveQuizExpandableCardForHostStore } from '@/store/live-quiz/useLiveQuizExpandableCardForHostStore';
import { cn } from '@/lib/utils';

export default function HostMainFooter() {
    const { isExpanded, setType } = useLiveQuizExpandableCardForHostStore();

    return (
        <div className={cn('absolute bottom-4 right-4 z-100', isExpanded && '-translate-x-[32vw]')}>
            <HostControls
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
