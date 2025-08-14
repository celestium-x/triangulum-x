import RedisCache from '../cache/RedisCache';
import DatabaseQueue from '../queue/DatabaseQueue';
import QuizController from '../controllers/quiz-controller/quizController';
import PhaseQueue from '../queue/PhaseQueue';

export let redisCacheInstance: RedisCache;
export let databaseQueueInstance: DatabaseQueue;
export let quizControllerInstance: QuizController;
export let phaseQueueInstance: PhaseQueue;

export default function initServices() {
    redisCacheInstance = new RedisCache();
    databaseQueueInstance = new DatabaseQueue();
    quizControllerInstance = new QuizController();
    phaseQueueInstance = new PhaseQueue();
}
