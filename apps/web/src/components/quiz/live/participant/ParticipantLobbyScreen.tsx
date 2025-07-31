import WaitingLobbyParticipantLeft from './WaitingLobbyParticipantLeft';
import WaitingLobbyParticipantRight from './WaitingLobbyParticipantRight';

export default function ParticipantLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyParticipantLeft />
            <WaitingLobbyParticipantRight />
        </div>
    );
}
