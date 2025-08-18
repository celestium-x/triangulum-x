import RedisCache from '../cache/RedisCache';
import DatabaseQueue from '../queue/DatabaseQueue';
import QuizController from '../controllers/quiz-controller/quizController';
import PhaseQueue from '../queue/PhaseQueue';
import QuizManager from '../sockets/QuizManager';
import dotenv from "dotenv";
import Redis from 'ioredis';

dotenv.config();

export let redisCacheInstance: RedisCache;
export let databaseQueueInstance: DatabaseQueue;
export let quizControllerInstance: QuizController;
export let phaseQueueInstance: PhaseQueue;
export let quizManagerInstance: QuizManager;

export let publisherInstance: Redis;
export let subscriberInstance: Redis;

const REDIS_URL = process.env.REDIS_URL;

export default function initServices() {

    publisherInstance = new Redis(REDIS_URL!);
    subscriberInstance = new Redis(REDIS_URL!);
    redisCacheInstance = new RedisCache();

    databaseQueueInstance = new DatabaseQueue();
    quizControllerInstance = new QuizController();
    
    quizManagerInstance = new QuizManager({
        publisher: publisherInstance,
        subscriber: subscriberInstance,
        redis_cache: redisCacheInstance,
        database_queue: databaseQueueInstance
    });
    
    phaseQueueInstance = new PhaseQueue();

    phaseQueueInstance.set_quiz_manager(quizManagerInstance);
    quizManagerInstance.set_phase_queue(phaseQueueInstance);
}
