import WebSocketClient from '@/socket/socket';

let client: WebSocketClient;

export function getWebSocketClient() {
    if (!client) {
        client = new WebSocketClient('ws://localhost:3000/api/v1/ws');
    }
    return client;
}
