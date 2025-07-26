import { JobOption, QueueJobTypes } from '../types/database-queue-types';
import Bull from 'bull';
import prisma, { GameSession, Prisma } from '@repo/db/client';
const REDIS_URL = process.env.REDIS_URL;

interface UpdateGameSessionJobtype {
    id: string;
    gameSessionId?: string;
    data: Prisma.GameSessionUpdateInput;
}

export default class DatabaseQueue {
    private database_queue: Bull.Queue;
    private prisma = prisma;
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
    }

    private static async update_game_session_processor(
        job: Bull.Job,
    ): Promise<
        { success: boolean; gameSession: GameSession } | { success: boolean; error: string }
    > {
        const { id, data }: UpdateGameSessionJobtype = job.data;

        try {
            const gameSession = await prisma.gameSession.update({
                where: {
                    id: id,
                },
                data: data,
            });

            return { success: true, gameSession };
        } catch (err) {
            console.error('Error while processing game session update', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error',
            };
        }
    }

    public async update_game_session(
        id: string,
        data: Prisma.GameSessionUpdateInput,
        options?: Partial<JobOption>,
    ) {
        return await this.database_queue.add(
            QueueJobTypes.UPDATE_GAME_SESSION,
            { id, data },
            { ...this.default_job_options, ...options },
        );
    }
}
