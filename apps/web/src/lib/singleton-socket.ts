import WebSocketClient from '@/socket/socket';

let client: WebSocketClient;

export function getWebSocketClient() {
    // const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!client) {
        // console.log('creating new client------------------ >');
        client = new WebSocketClient('ws://localhost:8080');
    }
    return client;
}
