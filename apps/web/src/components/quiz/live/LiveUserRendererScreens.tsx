import { useUserRoleStore } from "@/store/live-quiz/useLiveQuizUserStore";
import HostMainScreen from "./host/HostMainScreen";
import ParticipantMainScreen from "./participant/ParticipantLobbyScreen";
import SpectatorMainScreen from "./spectator/SpectatorMainScreen";
import { templates } from "@/lib/templates";
import { useLiveQuizStore } from "@/store/live-quiz/useLiveQuizStore";
import CanvasAccents from "@/components/utility/CanvasAccents";

export default function LiveUserRendererScreens() {
    const { currentUserType } = useUserRoleStore();
    const { quiz } = useLiveQuizStore();
    const template = quiz?.theme ? templates.find((template) => template.id === quiz.theme) : null;

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
        <div className="h-full w-full relative" style={{
            backgroundColor: template?.background_color,
            color: template?.text_color,
        }}>
            <CanvasAccents
                design={template?.accent_type}
                accentColor={template?.accent_color}
            />
            {renderCurrentUserScreen()}
        </div>
    );
}
