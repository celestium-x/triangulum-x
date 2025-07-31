import { useLiveQuizStore } from "@/store/live-quiz/useLiveQuizStore";
import { ParticipantScreenEnum } from "@/types/prisma-types";
import ParticipantLobbyScreen from "./ParticipantLobbyScreen";

export default function ParticipantWaitingScreen() {
    const { gameSession } = useLiveQuizStore();

    function renderHostScreenPanels() {
        switch (gameSession?.participantScreen) {
            case ParticipantScreenEnum.LOBBY:
                return <ParticipantLobbyScreen />;
        }
    }
    return (
        <div>
            {renderHostScreenPanels()}
        </div>
    )
}
