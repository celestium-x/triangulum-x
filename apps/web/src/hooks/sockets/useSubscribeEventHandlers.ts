import { useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import { MESSAGE_TYPES } from "@/types/web-socket-types";
import { useLiveParticipantsStore } from "@/store/live-quiz/useLiveParticipantsStore";

export const useSubscribeEventHandlers = () => {
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();
    const { upsertParticipant } = useLiveParticipantsStore();
    function handleIncomingMessage(payload: any) {
        console.log('Incoming message from web socket at handler is ', payload);
        upsertParticipant(payload);
    }

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        return () => {
            unsubscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        }
    })
}