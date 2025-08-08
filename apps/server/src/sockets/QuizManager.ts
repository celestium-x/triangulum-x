import Redis from 'ioredis';
import RedisCache from '../cache/RedisCache';
import prisma, { Participant, Spectator } from '@repo/db/client';
import { CookiePayload, MESSAGE_TYPES, PubSubMessageTypes } from '../types/web-socket-types';

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

    public async onHostconnect(game_session_id: string, quiz_id: string, _host_socket_id: string) {
        const game_session = await prisma.gameSession.findUnique({
            where: { id: game_session_id },
        });

        if (!game_session) {
            throw new Error('Game session not found');
        }

        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quiz_id,
            },
            include: {
                questions: true,
            },
        });

        if (!quiz) {
            throw new Error('Quiz not found');
        }

        await this.redis_cache.set_game_session(game_session_id, game_session);
        await this.redis_cache.set_quiz(game_session_id, quiz_id, quiz);
    }

    public async onParticipantConnect(decoded_cookie_payload: CookiePayload) {
        const particpant_id = decoded_cookie_payload.userId;
        const particicpant_cache = await this.redis_cache.get_participant(
            decoded_cookie_payload.gameSessionId,
            particpant_id,
        );
        const participant: Partial<Participant> = {
            id: particicpant_cache.id,
            avatar: particicpant_cache.avatar,
            nickname: particicpant_cache.nickname,
        };
        const pub_sub_message: PubSubMessageTypes = {
            type: MESSAGE_TYPES.PARTICIPANT_JOIN_GAME_SESSION,
            payload: participant,
        };
        this.publish_event_to_redis(decoded_cookie_payload.gameSessionId, pub_sub_message);
    }

    public async onSpectatorConnect(payload: CookiePayload) {
        const spectator_id = payload.userId;

        const spectator_cache = await this.redis_cache.get_spectator(
            payload.gameSessionId,
            spectator_id,
        );

        const spectator: Partial<Spectator> = {
            id: spectator_cache.id,
            avatar: spectator_cache.avatar,
            nickname: spectator_cache.nickname,
        };

        const pub_sub_message: PubSubMessageTypes = {
            type: MESSAGE_TYPES.SPECTATOR_JOIN_GAME_SESSION,
            payload: spectator,
        };

        this.publish_event_to_redis(payload.gameSessionId, pub_sub_message);
    }

    public publish_event_to_redis(game_session_id: string, event: PubSubMessageTypes) {
        try {
            const key = this.get_redis_key(game_session_id);
            this.publisher.publish(key, JSON.stringify(event));
        } catch (err) {
            console.error('Error while publishing event to redis', err);
        }
    }

    private get_redis_key(game_session_id: string) {
        return `game_session:${game_session_id}`;
    }
}
