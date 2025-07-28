import Redis from 'ioredis';
import RedisCache from '../cache/RedisCache';
import prisma from '@repo/db/client';

export interface QuizManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    redis_cache: RedisCache;
}

export default class QuizManager {
    private publisher: Redis;
    private subscriber: Redis;
    private redis_cache: RedisCache;

    constructor(dependencies: QuizManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.redis_cache = dependencies.redis_cache;
    }

    public async onHostconnect(game_session_id: string, _host_socket_id: string) {
        const game_session = await prisma.gameSession.findUnique({
            where: { id: game_session_id },
        });
        if (!game_session) {
            throw new Error('Game session not found');
        }
        this.redis_cache.set_game_session(game_session_id, game_session);
    }
}
