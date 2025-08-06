export interface Message {
    id: string;
    text: string | undefined;
    sender: 'user' | 'other';
    timestamp: Date;
}

export interface User {
    id: string;
    name: string;
    avatar?: string | React.SVGElementType;
    svg?: React.ReactElement;
    isCurrentUser?: boolean;
}
