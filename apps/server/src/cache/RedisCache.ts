import { GameSession } from '@repo/db/client';
import Redis from 'ioredis';

const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const REDIS_URL = process.env.REDIS_URL;

export default class RedisCache {
    private redis_cache: Redis;

    constructor() {
        this.redis_cache = new Redis(REDIS_URL!);
    }

    public async set_game_session(
        game_live_session_id: string,
        game_live_session: Partial<GameSession>,
    ) {
        try {
            const key = this.get_game_session_key(game_live_session_id);
            const entries: [string, string][] = Object.entries(game_live_session).map(
                ([key, value]) => [key, JSON.stringify(value)],
            );
            await this.redis_cache.hset(key, ...entries.flat());
            await this.redis_cache.expire(key, SECONDS * MINUTES * HOURS);
        } catch (err) {
            console.error('Error in session management while creating session', err);
        }
    }

    public async get_game_session(sessionId: string): Promise<Partial<GameSession> | null> {
        try {
            const key = this.get_game_session_key(sessionId);
            const data = await this.redis_cache.hgetall(key);

            if (Object.keys(data).length === 0) return null;

            const parsed: Partial<GameSession> = {};
            for (const [key, value] of Object.entries(data)) {
                try {
                    parsed[key as keyof GameSession] = JSON.parse(value);
                } catch {
                    parsed[key as keyof GameSession] = value as any;
                }
            }

            return parsed;
        } catch (err) {
            console.error('RedisCache error get_game_session : ', err);
            return null;
        }
    }

    public async delete_game_session(game_live_session_id: string) {
        try {
            const key = this.get_game_session_key(game_live_session_id);
            await this.redis_cache.del(key);
        } catch (err) {
            console.error('RedisCache error delete_game_session : ', err);
        }
    }

    private get_game_session_key(game_live_session_id: string) {
        return `game_session:${game_live_session_id}`;
    }
}
