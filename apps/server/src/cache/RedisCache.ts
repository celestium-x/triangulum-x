import { GameSession, Spectator } from '@repo/db/client';
import Redis from 'ioredis';
import { Participant } from '@repo/db/client';
import { ChatMessage } from '../types/web-socket-types';

const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const REDIS_URL = process.env.REDIS_URL;

export default class RedisCache {
    private redis_cache: Redis;

    constructor() {
        this.redis_cache = new Redis(REDIS_URL!);
    }

    //  <------------------ GAME_SESSION ------------------>

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

    //  <------------------ PARTICIPANT ------------------>

    public async get_participant(game_session_id: string, participant_id: string) {
        const key = this.get_participants_key(game_session_id);
        try {
            const data = await this.redis_cache.hget(key, participant_id);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error('Error in get_participant:', err);
            return null;
        }
    }

    public async set_participants(
        game_session_id: string,
        participant_id: string,
        particpant: Partial<Participant>,
    ) {
        try {
            const key = this.get_participants_key(game_session_id);
            await this.redis_cache.hset(key, participant_id, JSON.stringify(particpant));
            await this.redis_cache.expire(key, 60 * 60 * 24);
        } catch (err) {
            console.error('Error while setting participant in cache : ', err);
        }
    }

    public async delete_participant(game_session_id: string, participant_id: string) {
        const key = this.get_participants_key(game_session_id);
        try {
            await this.redis_cache.hdel(key, participant_id);
        } catch (error) {
            console.error('Error in delete-participant: ', error);
        }
    }

    private get_participants_key(game_session_id: string) {
        return `game_session:${game_session_id}:participants`;
    }

    //  <------------------ SPECTATOR ------------------>

    public async set_spectator(
        game_session_id: string,
        spectator_id: string,
        spectator: Partial<Spectator>,
    ) {
        try {
            const key = this.get_spectator_key(game_session_id);
            await this.redis_cache.hset(key, spectator_id, JSON.stringify(spectator));
            await this.redis_cache.expire(key, 60 * 60 * 24);
        } catch (error) {
            console.error('Error while setting spectator in cache: ', error);
        }
    }

    public async get_spectator(game_session_id: string, spectator_id: string) {
        const key = this.get_spectator_key(game_session_id);
        try {
            const data = await this.redis_cache.hget(key, spectator_id);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error in get-spectator: ', error);
            return null;
        }
    }

    public async delete_spectator(game_session_id: string, spectator_id: string) {
        const key = this.get_spectator_key(game_session_id);
        try {
            await this.redis_cache.hdel(key, spectator_id);
        } catch (error) {
            console.error('Error in delete-spectator: ', error);
        }
    }

    public get_spectator_key(game_session_id: string) {
        return `game_session:${game_session_id}:spectators`;
    }

    //  <------------------ CHAT ------------------>

    public async add_chat_message(
        game_session_id: string,
        message: ChatMessage
    ) {
        try {

            const key = this.get_game_session_chats_key(game_session_id);

            await this.redis_cache.lpush(key, JSON.stringify(message));
            await this.redis_cache.ltrim(key, 0, 99);
            await this.redis_cache.expire(key, SECONDS * MINUTES * HOURS);

        } catch (error) {
            console.error('Error adding chat message: ', error);
        }
    }

    public async get_game_session_chats(
        game_session_id: string,
        limit: number = 50,
        offset: number = 0
    ) {
        try {

            const key = this.get_game_session_chats_key(game_session_id);

            const messages = await this.redis_cache.lrange(key, offset, offset + limit - 1);

            return messages.map(msg => {
                try {
                    return JSON.parse(msg);
                } catch (error) {
                    console.error('Failed to parse message: ', error);
                    return null;
                }
            })

        } catch (error) {
            console.error('Error getting chat messages: ', error);
            return;
        }
    }

    private get_game_session_chats_key(game_session_id: string) {
        return `game_session:${game_session_id}:chats`;
    }
}
