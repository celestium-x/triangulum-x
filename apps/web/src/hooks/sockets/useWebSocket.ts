import { getWebSocketClient } from '@/lib/singleton-socket';
import WebSocketClient from '@/socket/socket';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useWebSocket = () => {
    const socket = useRef<WebSocketClient | null>(null);
    const pathname = usePathname();
    useEffect(() => {
        const segments = pathname.split('/');
        const quizId = segments[segments.length - 1];
        if (!quizId) return;
        if (!socket.current) {
            socket.current = getWebSocketClient(quizId);
        }
    }, [pathname]);

    function subscribeToHandler(type: string, handler: (payload: unknown) => void) {
        if (!socket.current) return;
        socket.current.subscribe_to_handlers(type, handler);
    }

    function ubsubscribeToHandler(type: string, handler: (payload: unknown) => void) {
        if (!socket.current) return;
        socket.current.unsubscribe_to_handlers(type, handler);
    }
    return {
        subscribeToHandler,
        ubsubscribeToHandler,
    };
};
