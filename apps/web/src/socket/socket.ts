import { stringify } from "querystring";

export default class WebSocketClient {
    private ws!: WebSocket;
    private is_connected: boolean = false;
    private url: string;
    private reconnect_attempts = 0;
    private max_reconnect_attempts = 5;
    private reconnect_timeout: NodeJS.Timeout | null = null;
    private reconnect_delay: number = 1000;
    private message_queue: unknown[] = [];
    private handlers: Map<string, Function[]> = new Map();

    constructor(url: string) {
        this.url = url;
        this.initialize_connection();
    }

    private initialize_connection() {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = () => {
            this.is_connected = true;
            this.reconnect_attempts = 0;
            this.flush_message_queue();
        };

        this.ws.onmessage = (event) => {
            try {
                const parsed_data = JSON.parse(event.data);
                this.handle_incoming_message(parsed_data);
            } catch (error) {
                console.error("Failed to parse incoming WebSocket message:", event.data);
            }
        };

        this.ws.onclose = (event) => {
            this.is_connected = false;

            if (this.reconnect_timeout) {
                clearTimeout(this.reconnect_timeout);
                this.reconnect_timeout = null;
            }

            if (event.code !== 1000 && this.reconnect_attempts < this.max_reconnect_attempts) {
                this.attempt_reconnect();
            } else if (this.reconnect_attempts >= this.max_reconnect_attempts) {
                console.error("Max reconnection attempts reached");
            }
        };
    }

    private handle_incoming_message(parsed_data: { type: string; payload: any }) {
        const { type, payload } = parsed_data;
        if (this.handlers.has(type)) {
            this.handlers.get(type)?.forEach((handler) => handler(payload));
        }
    }

    public subscribe_to_handlers(type: string, handler: (payload: any) => void) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, []);
        }
        this.handlers.get(type)?.push(handler);
    }

    public unsubscribe_to_handlers(type: string, handler: (payload: any) => void) {
        const handler_list = this.handlers.get(type);
        if (!handler_list) return;

        const index = handler_list.indexOf(handler);
        if (index !== -1) {
            handler_list.splice(index, 1);
        }

        if (handler_list.length === 0) {
            this.handlers.delete(type);
        } else {
            this.handlers.set(type, handler_list);
        }
    }

    public send_message(message: any) {
        if (this.is_connected && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            this.message_queue.push(message);
        }
    }

    private attempt_reconnect() {
        this.reconnect_attempts++;
        this.reconnect_timeout = setTimeout(() => {
            this.initialize_connection();
        }, this.reconnect_delay);
        this.reconnect_delay = Math.min(this.reconnect_delay * 2, 30000);
    }

    private flush_message_queue() {
        this.message_queue.forEach((message) => this.send_message(message));
        this.message_queue = [];
    }

    public close(code: number = 1000, reason: string = "Client disconnect") {
        this.ws.close(code, reason);
    }
}
