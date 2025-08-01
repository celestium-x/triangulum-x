import { useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import { MESSAGE_TYPES } from "@/types/web-socket-types";

export const useSubscribeEventHandlers = () => {
    const { subscribeToHandler, unsubscribeToHandler } = useWebSocket();

    function handleIncomingMessage(message: any) {
        console.log('Incoming message:', message);
    }

    useEffect(() => {
        subscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        return () => {
            unsubscribeToHandler(MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION, handleIncomingMessage);
        }
    })
}