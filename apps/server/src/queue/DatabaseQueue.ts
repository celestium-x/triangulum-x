import { JobOption, QueueJobTypes } from '../types/database-queue-types';
import Bull from 'bull';
import prisma, { GameSession, Prisma, Quiz } from '@repo/db/client';
const REDIS_URL = process.env.REDIS_URL;

interface UpdateGameSessionJobtype {
    id: string;
    gameSessionId?: string;
    gameSession: Prisma.GameSessionUpdateInput;
}

interface UpdateQuizJobType {
    id: string;
    gameSessionId?: string;
    quiz: Prisma.QuizUpdateInput;
}

export default class DatabaseQueue {
    private database_queue: Bull.Queue;
    private default_job_options: JobOption = {
        attempts: 3,
        delay: 1000,
        removeOnFail: 5,
        removeOnComplete: 10,
    };

    constructor() {
        this.database_queue = new Bull('database-operations', {
            redis: REDIS_URL,
        });
        this.setupProcessors();
    }

    private setupProcessors() {
        this.database_queue.process(
            QueueJobTypes.UPDATE_GAME_SESSION,
            DatabaseQueue.update_game_session_processor,
        );
        this.database_queue.process(QueueJobTypes.UPDATE_QUIZ, DatabaseQueue.update_quiz_processor);
    }

    private static async update_game_session_processor(
        job: Bull.Job,
    ): Promise<
        { success: boolean; gameSession: GameSession } | { success: boolean; error: string }
    > {
        const { id, gameSession }: UpdateGameSessionJobtype = job.data;

        try {
            const updatedGameSession = await prisma.gameSession.update({
                where: {
                    id: id,
                },
                data: gameSession,
            });

            return { success: true, gameSession: updatedGameSession };
        } catch (err) {
            console.error('Error while processing game session update', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error',
            };
        }
    }

    private static async update_quiz_processor(
        job: Bull.Job,
    ): Promise<{ success: boolean; quiz: Quiz } | { success: boolean; error: string }> {
        try {
            const { id, quiz }: UpdateQuizJobType = job.data;
            const updateQuiz = await prisma.quiz.update({
                where: {
                    id,
                },
                data: quiz,
            });

            return { success: true, quiz: updateQuiz };
        } catch (err) {
            console.error('Error while processing quiz update', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error',
            };
        }
    }

    public async update_game_session(
        id: string,
        gameSession: Prisma.GameSessionUpdateInput,
        game_session_id?: string,
        options?: Partial<JobOption>,
    ) {
        return await this.database_queue.add(
            QueueJobTypes.UPDATE_GAME_SESSION,
            { id, gameSession },
            { ...this.default_job_options, ...options },
        );
    }

    public async update_quiz(
        id: string,
        quiz: Prisma.QuizUpdateInput,
        game_session_id?: string,
        options?: Partial<JobOption>,
    ) {
        return await this.database_queue.add(
            QueueJobTypes.UPDATE_QUIZ,
            { id, quiz },
            { ...this.default_job_options, ...options },
        );
    }
}
