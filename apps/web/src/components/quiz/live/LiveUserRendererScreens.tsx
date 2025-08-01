import { useUserRoleStore } from '@/store/live-quiz/useLiveQuizUserStore';
import HostMainScreen from './host/HostMainScreen';
import SpectatorMainScreen from './spectator/SpectatorMainScreen';
import { templates } from '@/lib/templates';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import CanvasAccents from '@/components/utility/CanvasAccents';
import ParticipantMainScreen from './participant/ParticipantMainScreen';
import { useWebSocket } from '@/hooks/sockets/useWebSocket';
import { useSubscribeEventHandlers } from '@/hooks/sockets/useSubscribeEventHandlers';

export default function LiveUserRendererScreens() {
    const { currentUserType } = useUserRoleStore();
    const { quiz } = useLiveQuizStore();
    const template = quiz?.theme ? templates.find((template) => template.id === quiz.theme) : null;
    useWebSocket();

    useSubscribeEventHandlers();
    function renderCurrentUserScreen() {
        switch (currentUserType) {
            case 'HOST':
                return <HostMainScreen />;
            case 'PARTICIPANT':
                return <ParticipantMainScreen />;
            case 'SPECTATOR':
                return <SpectatorMainScreen />;
            default:
                return <div>Unknown</div>;
        }
    }

    return (
        <div
            className="h-full w-full relative"
            style={{
                backgroundColor: template?.background_color,
                color: template?.text_color,
            }}
        >
            <CanvasAccents design={template?.accent_type} accentColor={template?.accent_color} />
            {renderCurrentUserScreen()}
        </div>
    );
}
