import SpectatorChatLeft from './SpectatorChatLeft';
import SpectatorActions from './SpectatorActions';

export default function SpectatorChatMain() {
    return (
        <div className="h-full w-full flex select-none">
            <SpectatorChatLeft />
            <SpectatorActions />
        </div>
    );
}
