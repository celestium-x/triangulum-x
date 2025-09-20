import dotenv from "dotenv";
import Redis from "ioredis";
import RedisCache from "../cache/redis-cache";
import PhaseQueueProcessor from "../client/phase-queue-processor";
import TransitionWorker from "../job/transition-worker";
import Publisher from "../client/publisher";
import DatabaseQueue from "../queue/DatabaseQueue";

dotenv.config();

export let redisCacheInstance: RedisCache;
export let databaseQueueInstance: DatabaseQueue;
export let phaseQueueProcessorInstance: PhaseQueueProcessor;
export let transitionWorkerInstance: TransitionWorker;

export let redisPublisherInstance: Redis;
export let publisherInstnace: Publisher;
const REDIS_URL = process.env.REDIS_URL;

export default function initServices() {
  redisPublisherInstance = new Redis(REDIS_URL!);
  phaseQueueProcessorInstance = new PhaseQueueProcessor();
  transitionWorkerInstance = new TransitionWorker();
  redisCacheInstance = new RedisCache();
  publisherInstnace = new Publisher();
  databaseQueueInstance = new DatabaseQueue();
}
