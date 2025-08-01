import Redis from 'ioredis';
import RedisCache from '../cache/RedisCache';
import prisma, { Participant } from '@repo/db/client';
import { CookiePayload } from '../types/web-socket-types';

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

    public async onParticipantConnect(payload: CookiePayload) {
        const particpant_id = payload.userId;
        const particicpant_cache = await this.redis_cache.get_participant(
            payload.gameSessionId,
            particpant_id,
        );

        const participant: Partial<Participant> = {
            avatar: particicpant_cache.avatar,
            nickname: particicpant_cache.nickname,
        };

        this.publisher.publish(
            this.get_redis_key(payload.gameSessionId),
            JSON.stringify(participant),
        );
    }

    public async onSpectatorConnect(payload: CookiePayload) {
        const spectator_id = payload.userId;
        
    }

    private get_redis_key(game_session_id: string) {
        return `game_session:${game_session_id}`;
    }
}
