import { useUserRoleStore } from "@/store/live-quiz/useLiveQuizUserStore";
import HostMainScreen from "./host/HostMainScreen";
import ParticipantMainScreen from "./participant/ParticipantMainScreen";
import SpectatorMainScreen from "./spectator/SpectatorMainScreen";
import { templates } from "@/lib/templates";
import { useLiveQuizStore } from "@/store/live-quiz/useLiveQuizStore";

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
        <div className="h-full w-full" style={{
            backgroundColor: template?.background_color,
            color: template?.text_color,
        }}>
            {renderCurrentUserScreen()}
        </div>
    )
}