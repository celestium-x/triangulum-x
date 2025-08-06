import WaitingLobbyParticipantLeft from './WaitingLobbyParticipantLeft';

export default function ParticipantLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyParticipantLeft />
            {/* <WaitingLobbyParticipantRight /> */}
        </div>
    );
}
