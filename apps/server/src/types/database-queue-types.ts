export interface JobOption {
    attempts?: number;
    delay?: number;
    removeOnComplete?: number;
    removeOnFail?: number;
}

export enum QueueJobTypes {
    UPDATE_GAME_SESSION = 'UPDATE_GAME_SESSION',
    UPDATE_QUIZ = 'UPDATE_QUIZ',
}
