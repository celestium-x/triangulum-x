
import ParticipantLobbyFooter from './ParticipantLobbyFooter';
import WaitingLobbyParticipantLeft from './WaitingLobbyParticipantLeft';


export default function ParticipantLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyParticipantLeft />
            <ParticipantLobbyFooter />
            {/* <WaitingLobbyParticipantRight /> */}
        </div>
    );
}
