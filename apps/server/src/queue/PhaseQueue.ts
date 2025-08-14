import Bull from 'bull';
import RedisCache from '../cache/RedisCache';
import { redisCacheInstance } from '../services/init-services';

interface PhaseTransitionJob {
    gameSessionId: string;
    questionId: string;
    questionIndex: number;
    fromPhase: string;
    toPhase: string;
    executeAt: number;
}

export default class PhaseQueue {
    private phase_queue: Bull.Queue;
    private is_queue_processor: boolean = false;
    private server_id: string;
    private redis_cache: RedisCache = redisCacheInstance;
    private electionIntervalId?: NodeJS.Timeout;

    constructor() {
        this.server_id = process.env.SERVER_ID || `server_${Math.random()}`;
        this.phase_queue = new Bull('phase-transitions', {
            redis: { host: 'localhost', port: 6379 },
        });
        this.setup_queue_events();
        this.elect_queue_processor();
        this.setup_shutdown_hooks();
    }

    private setup_queue_events() {
        this.phase_queue.on('completed', (job) => {
            console.warn(`[${this.server_id}] Job completed:`, job.id);
        });

        this.phase_queue.on('failed', (job, err) => {
            console.error(`[${this.server_id}] Job failed:`, job.id, err);
        });

        this.phase_queue.on('stalled', (job) => {
            console.warn(`[${this.server_id}] Job stalled:`, job.id);
        });
    }

    private async elect_queue_processor() {
        if (this.electionIntervalId) {
            console.warn(`[${this.server_id}] Election already running, skipping...`);
            return;
        }

        const lock_key = `phase_queue_processor_lock`;
        const ttl = 60;

        this.electionIntervalId = setInterval(
            async () => {
                if (this.is_queue_processor) {
                    const renewed = await this.redis_cache.renew_lock(lock_key, ttl);
                    if (!renewed) {
                        console.warn(`[${this.server_id}] Lost leadership`);
                        this.is_queue_processor = false;
                    }
                } else {
                    const lock_value = `${this.server_id}_${Date.now()}`;
                    const acquired = await this.redis_cache.try_acquire_lock(
                        lock_key,
                        lock_value,
                        ttl,
                    );
                    if (acquired) {
                        this.is_queue_processor = true;
                        this.start_processing_jobs();
                    }
                }
            },
            5000 + Math.floor(Math.random() * 2000),
        );
    }

    private setup_shutdown_hooks() {
        const cleanup = () => {
            if (this.electionIntervalId) {
                clearInterval(this.electionIntervalId);
            }
            this.phase_queue.close().then(() => {
                console.warn(`[${this.server_id}] Queue closed.`);
            });
        };

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    }

    public async start_processing_jobs() {
        this.phase_queue.process('phase_transition', async (_job) => {
            // console.log(`[${this.server_id}] Processing job`, job.data);
        });
    }

    public async schedule_phase_transition(data: PhaseTransitionJob): Promise<void> {
        const delay = Math.max(0, data.executeAt - Date.now());
        try {
            await this.phase_queue.add('phase_transition', data, {
                delay,
                jobId: `${data.gameSessionId}_${data.questionIndex}_${data.fromPhase}_${data.toPhase}`,
            });
        } catch (error) {
            console.error(`[${this.server_id}] Failed to schedule phase transition:`, error);
        }
    }
}
