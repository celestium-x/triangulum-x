'use client';
import WaitingLobbyHostLeft from './WaitingLobbyHostLeft';
import WaitingLobbyHostRight from './WaitingLobbyHostRight';

export default function HostLobbyScreen() {
    return (
        <div className="w-full h-full flex">
            <WaitingLobbyHostLeft />
            <WaitingLobbyHostRight />
        </div>
    );
}
