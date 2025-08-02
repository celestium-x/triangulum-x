import RedisCache from '../cache/RedisCache';
import DatabaseQueue from '../queue/DatabaseQueue';

export let redisCacheInstance: RedisCache;
export let databaseQueueInstance: DatabaseQueue;
export default function initServices() {
    redisCacheInstance = new RedisCache();
    databaseQueueInstance = new DatabaseQueue();
}
