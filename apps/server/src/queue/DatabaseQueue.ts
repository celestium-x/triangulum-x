import { JobOption, QueueJobTypes } from '../types/database-queue-types';
import Bull from 'bull';
import prisma, { GameSession, Participant, Prisma, Quiz } from '@repo/db/client';
import RedisCache from '../cache/RedisCache';
import { redisCacheInstance } from '../services/init-services';
const REDIS_URL = process.env.REDIS_URL;

interface UpdateGameSessionJobtype {
    id: string;
    game_session_id: string;
    gameSession: Prisma.GameSessionUpdateInput;
}

interface UpdateParticipantJobType {
    id: string;
    game_session_id: string;
    participant: Prisma.ParticipantUpdateInput;
}

interface UpdateQuizJobType {
    id: string;
    game_session_id: string;
    quiz: Prisma.QuizUpdateInput;
}

export default class DatabaseQueue {
    private database_queue: Bull.Queue;
    private redis_cache: RedisCache;
    private default_job_options: JobOption = {
        attempts: 3,
        delay: 1000,
        removeOnFail: 5,
        removeOnComplete: 10,
    };

    constructor() {
        this.redis_cache = redisCacheInstance;
        this.database_queue = new Bull('database-operations', {
            redis: REDIS_URL,
        });
        this.setupProcessors();
    }

    private setupProcessors() {
        this.database_queue.process(
            QueueJobTypes.UPDATE_GAME_SESSION,
            this.update_game_session_processor.bind(this),
        );
        this.database_queue.process(
            QueueJobTypes.UPDATE_QUIZ,
            this.update_quiz_processor.bind(this),
        );
        this.database_queue.process(
            QueueJobTypes.UPDATE_PARTICIPANT,
            this.update_participant_processor.bind(this),
        );
    }

    private async update_participant_processor(
        job: Bull.Job,
    ): Promise<
        { success: boolean; participant: Participant } | { success: boolean; error: string }
    > {
        const { id, game_session_id, participant }: UpdateParticipantJobType = job.data;
        try {
            const updatedParticipant = await prisma.participant.update({
                where: {
                    id: id,
                },
                data: participant,
            });

            await this.redis_cache.set_participants(
                game_session_id,
                updatedParticipant.id,
                updatedParticipant,
            );
            return { success: true, participant: updatedParticipant };
        } catch (error) {
            console.error(`Error while updating participant: `, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    private async update_game_session_processor(
        job: Bull.Job,
    ): Promise<
        { success: boolean; gameSession: GameSession } | { success: boolean; error: string }
    > {
        const { id, gameSession, game_session_id }: UpdateGameSessionJobtype = job.data;

        try {
            const updatedGameSession = await prisma.gameSession.update({
                where: {
                    id: id,
                },
                data: gameSession,
            });

            await this.redis_cache.set_game_session(game_session_id, updatedGameSession);
            return { success: true, gameSession: updatedGameSession };
        } catch (err) {
            console.error('Error while processing game session update', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Unknown error',
            };
        }
    }

    private async update_quiz_processor(
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
        game_session_id: string,
        options?: Partial<JobOption>,
    ) {
        return await this.database_queue.add(
            QueueJobTypes.UPDATE_GAME_SESSION,
            { id, gameSession, game_session_id },
            { ...this.default_job_options, ...options },
        );
    }

    public async update_quiz(
        id: string,
        quiz: Prisma.QuizUpdateInput,
        game_session_id: string,
        options?: Partial<JobOption>,
    ) {
        return await this.database_queue.add(
            QueueJobTypes.UPDATE_QUIZ,
            { id, quiz, game_session_id },
            { ...this.default_job_options, ...options },
        );
    }

    public async update_participant(
        id: string,
        participant: Prisma.ParticipantUpdateInput,
        game_session_id: string,
        options?: Partial<JobOption>,
    ) {
        return await this.database_queue.add(
            QueueJobTypes.UPDATE_PARTICIPANT,
            { id, participant, game_session_id },
            { ...this.default_job_options, ...options },
        );
    }
}
