import Redis from 'ioredis';
import RedisCache from '../cache/RedisCache';
import prisma, { Participant, Spectator } from '@repo/db/client';
import { CookiePayload, MESSAGE_TYPES, PhaseQueueJobDataType, PubSubMessageTypes, SECONDS } from '../types/web-socket-types';
import { HostScreen, ParticipantScreen, QuizPhase, SpectatorScreen } from '.prisma/client';
import DatabaseQueue from '../queue/DatabaseQueue';
import fi from 'zod/v4/locales/fi.js';
import PhaseQueue from '../queue/PhaseQueue';

export interface QuizManagerDependencies {
    publisher: Redis;
    subscriber: Redis;
    redis_cache: RedisCache;
    database_queue: DatabaseQueue;
}

export default class QuizManager {
    private publisher: Redis;
    private subscriber: Redis;
    private redis_cache: RedisCache;
    private database_queue: DatabaseQueue;
    private phase_queue!: PhaseQueue;

    constructor(dependencies: QuizManagerDependencies) {
        this.publisher = dependencies.publisher;
        this.subscriber = dependencies.subscriber;
        this.redis_cache = dependencies.redis_cache;
        this.database_queue = dependencies.database_queue;
    }

    public set_phase_queue(phase_queue_instance: PhaseQueue) {
        this.phase_queue = phase_queue_instance
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

    public async handle_transition_phase(data: PhaseQueueJobDataType) {
        if (data.fromPhase === QuizPhase.QUESTION_READING && data.toPhase === QuizPhase.QUESTION_ACTIVE) {

            console.log("transitioning from question-reading to question-active");

            const quiz = await this.redis_cache.get_quiz(data.gameSessionId);

            if (!quiz) {
                // send websocket message for error
                console.error("Quiz not found");
                return;
            }

            const question = quiz.questions?.find((q) => q.id === data.questionId);

            if (!question) {
                // send websocket message for error
                console.error(`Question with id: ${data.questionId} doesn't exist`);
                return;
            }

            const now = Date.now();
            const buffer = 2 * SECONDS; // 2 seconds
            const question_active_time = question.timeLimit * SECONDS;

            const start_time = now + buffer;
            const end_time = start_time + question_active_time;

            console.log("start-time: ", start_time);
            console.log("end-time: ", end_time);

            this.database_queue
                .update_game_session(
                    data.gameSessionId,
                    {
                        hostScreen: HostScreen.QUESTION_ACTIVE,
                        spectatorScreen: SpectatorScreen.QUESTION_ACTIVE,
                        participantScreen: ParticipantScreen.QUESTION_ACTIVE,
                        currentPhase: QuizPhase.QUESTION_ACTIVE,
                        phaseStartTime: new Date(start_time),
                        phaseEndTime: new Date(end_time),
                    },
                    data.gameSessionId,
                )
                .catch((err) => {
                    console.error('Failed to enqueue question active phase:', err);
                });

            console.log("added to queue and cache");

            const pub_sub_message_to_participant: PubSubMessageTypes = {
                type: MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_PARTICIPANT,
                payload: {
                    questionOptions: quiz?.questions?.[data.questionIndex]?.options,
                    participantScreen: QuizPhase.QUESTION_ACTIVE,
                    startTime: start_time,
                    endTime: end_time,
                }
            }
            this.publish_event_to_redis(data.gameSessionId, pub_sub_message_to_participant);

            const pub_sub_message_to_host: PubSubMessageTypes = {
                type: MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_HOST,
                payload: {
                    questionOptions: quiz?.questions?.[data.questionIndex]?.options,
                    hostScreen: QuizPhase.QUESTION_ACTIVE,
                    startTime: start_time,
                    endTime: end_time,
                }
            }
            this.publish_event_to_redis(data.gameSessionId, pub_sub_message_to_host);

            const pub_sub_message_to_spectator: PubSubMessageTypes = {
                type: MESSAGE_TYPES.QUESTION_ACTIVE_PHASE_TO_SPECTATOR,
                payload: {
                    questionOptions: quiz?.questions?.[data.questionIndex]?.options,
                    spectatorScreen: QuizPhase.QUESTION_ACTIVE,
                    startTime: start_time,
                    endTime: end_time,
                }
            }
            this.publish_event_to_redis(data.gameSessionId, pub_sub_message_to_spectator);

            console.log("sent messages to users & scheduled phase transition");

            await this.phase_queue.schedule_phase_transition({
                gameSessionId: data.gameSessionId,
                questionId: data.questionId,
                questionIndex: data.questionIndex,
                fromPhase: QuizPhase.QUESTION_ACTIVE,
                toPhase: QuizPhase.SHOW_RESULTS,
                executeAt: end_time
            });

        }
    }
}
