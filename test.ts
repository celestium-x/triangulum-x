import Bull from "bull";
import RedisCache from "../cache/RedisCache";
import { redisCacheInstance } from "../services/init-services";
import DatabaseQueue from "./DatabaseQueue";
import {
  HostScreen,
  ParticipantScreen,
  SpectatorScreen,
} from "@repo/db/client";

interface PhaseTransitionJob {
  gameSessionId: string;
  questionId: string;
  questionIndex: number;
  fromPhase: string;
  toPhase: string;
  executeAt: number;
}

interface PhaseTransitionData {
  hostScreen?: HostScreen;
  participantScreen?: ParticipantScreen;
  spectatorScreen?: SpectatorScreen;
  currentPhase?: string;
  phaseStartTime?: Date;
  phaseEndTime?: Date;
}

export default class PhaseQueue {
  private phase_queue: Bull.Queue;
  private is_queue_processor: boolean = false;
  private server_id: string;
  private redis_cache: RedisCache = redisCacheInstance;
  private database_queue: DatabaseQueue;
  private leadership_interval: NodeJS.Timeout | null = null;

  constructor(database_queue: DatabaseQueue) {
    this.server_id = process.env.SERVER_ID || `server_${Math.random()}`;
    this.database_queue = database_queue;

    this.phase_queue = new Bull("phase-transitions", {
      redis: { host: "localhost", port: 6379 },
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    });

    this.elect_queue_processor();
    this.setup_queue_events();
  }

  private async elect_queue_processor() {
    const lock_key = `phase_queue_processor_lock`;
    const lock_value = `${this.server_id}_${Date.now()}`;
    const ttl = 60; // 60 seconds TTL

    this.leadership_interval = setInterval(async () => {
      try {
        if (this.is_queue_processor) {
          // Renew lock if we're already leader
          const renewed = await this.redis_cache.renew_lock(lock_key, ttl);
          if (!renewed) {
            console.warn(
              `[${this.server_id}] Lost leadership - lock renewal failed`,
            );
            this.is_queue_processor = false;
            await this.stop_processing_jobs();
          } else {
            console.log(`[${this.server_id}] Leadership renewed`);
          }
        } else {
          // Try to acquire leadership
          const acquired = await this.redis_cache.try_acquire_lock(
            lock_key,
            lock_value,
            ttl,
          );
          if (acquired) {
            console.log(`[${this.server_id}] Acquired leadership`);
            this.is_queue_processor = true;
            await this.start_processing_jobs();
          } else {
            // Check who owns the lock for debugging
            const owner = await this.redis_cache.get_lock_owner(lock_key);
            console.log(
              `[${this.server_id}] Failed to acquire leadership. Current owner: ${owner}`,
            );
          }
        }
      } catch (error) {
        console.error(`[${this.server_id}] Error in leader election:`, error);
        this.is_queue_processor = false;
      }
    }, 5000); // Check every 5 seconds
  }

  private setup_queue_events() {
    this.phase_queue.on("completed", (job) => {
      console.log(`[${this.server_id}] Job completed:`, job.id);
    });

    this.phase_queue.on("failed", (job, err) => {
      console.error(`[${this.server_id}] Job failed:`, job.id, err);
    });

    this.phase_queue.on("stalled", (job) => {
      console.warn(`[${this.server_id}] Job stalled:`, job.id);
    });
  }

  public async start_processing_jobs() {
    if (!this.is_queue_processor) {
      console.warn(
        `[${this.server_id}] Attempted to start processing but not the leader`,
      );
      return;
    }

    console.log(
      `[${this.server_id}] Starting to process phase transition jobs`,
    );

    this.phase_queue.process(
      "phase-transition",
      async (job: Bull.Job<PhaseTransitionJob>) => {
        const { gameSessionId, questionId, questionIndex, fromPhase, toPhase } =
          job.data;

        console.log(`[${this.server_id}] Processing phase transition:`, {
          gameSessionId,
          questionId,
          questionIndex,
          fromPhase,
          toPhase,
        });

        try {
          await this.execute_phase_transition(job.data);
          console.log(
            `[${this.server_id}] Phase transition completed successfully`,
          );
        } catch (error) {
          console.error(`[${this.server_id}] Phase transition failed:`, error);
          throw error; // This will cause the job to be marked as failed
        }
      },
    );
  }

  public async stop_processing_jobs() {
    console.log(`[${this.server_id}] Stopping job processing`);
    // Bull will automatically stop processing new jobs when the process function is not active
    // We don't need to explicitly stop anything here
  }

  private async execute_phase_transition(jobData: PhaseTransitionJob) {
    const { gameSessionId, questionId, questionIndex, fromPhase, toPhase } =
      jobData;

    // Get current game session to validate state
    const currentSession =
      await this.redis_cache.get_game_session(gameSessionId);
    if (!currentSession) {
      throw new Error(`Game session ${gameSessionId} not found`);
    }

    // Validate that we're still in the expected phase
    if (currentSession.currentPhase !== fromPhase) {
      console.warn(
        `Phase mismatch: expected ${fromPhase}, but current is ${currentSession.currentPhase}`,
      );
      // Don't throw error, just log and return - the phase might have been manually changed
      return;
    }

    const now = Date.now();
    const phaseTransition = this.getPhaseTransitionData(
      toPhase,
      questionIndex,
      now,
    );

    // Update the game session with new phase
    await this.database_queue.update_game_session(
      gameSessionId,
      {
        currentQuestionIndex: questionIndex,
        currentQuestionId: questionId,
        ...phaseTransition,
        currentPhase: toPhase,
      },
      gameSessionId,
    );

    // Schedule next phase if needed
    await this.schedule_next_phase(
      gameSessionId,
      questionId,
      questionIndex,
      toPhase,
    );
  }

  private getPhaseTransitionData(
    toPhase: string,
    questionIndex: number,
    now: number,
  ): PhaseTransitionData {
    const SECONDS = 1000;

    switch (toPhase) {
      case "QUESTION_ACTIVE":
        const answerTime = 30 * SECONDS; // 30 seconds to answer
        return {
          hostScreen: HostScreen.QUESTION_ACTIVE,
          participantScreen: ParticipantScreen.QUESTION_ACTIVE,
          spectatorScreen: SpectatorScreen.QUESTION_ACTIVE,
          phaseStartTime: new Date(now),
          phaseEndTime: new Date(now + answerTime),
        };

      case "QUESTION_RESULTS":
        const resultsTime = 10 * SECONDS; // 10 seconds to show results
        return {
          hostScreen: HostScreen.QUESTION_RESULTS,
          participantScreen: ParticipantScreen.QUESTION_RESULTS,
          spectatorScreen: SpectatorScreen.QUESTION_RESULTS,
          phaseStartTime: new Date(now),
          phaseEndTime: new Date(now + resultsTime),
        };

      case "LEADERBOARD":
        const leaderboardTime = 15 * SECONDS; // 15 seconds to show leaderboard
        return {
          hostScreen: HostScreen.LEADERBOARD,
          participantScreen: ParticipantScreen.LEADERBOARD,
          spectatorScreen: SpectatorScreen.LEADERBOARD,
          phaseStartTime: new Date(now),
          phaseEndTime: new Date(now + leaderboardTime),
        };

      case "QUIZ_ENDED":
        return {
          hostScreen: HostScreen.QUIZ_ENDED,
          participantScreen: ParticipantScreen.QUIZ_ENDED,
          spectatorScreen: SpectatorScreen.QUIZ_ENDED,
          phaseStartTime: new Date(now),
          phaseEndTime: new Date(now + 60 * SECONDS), // 1 minute
        };

      default:
        throw new Error(`Unknown phase: ${toPhase}`);
    }
  }

  private async schedule_next_phase(
    gameSessionId: string,
    questionId: string,
    questionIndex: number,
    currentPhase: string,
  ) {
    const quiz = await this.redis_cache.get_quiz(gameSessionId);
    if (!quiz || !quiz.questions) {
      console.error("Quiz or questions not found");
      return;
    }

    const totalQuestions = quiz.questions.length;
    let nextPhase: string;
    let delay: number;

    const now = Date.now();
    const SECONDS = 1000;

    switch (currentPhase) {
      case "QUESTION_ACTIVE":
        nextPhase = "QUESTION_RESULTS";
        delay = 30 * SECONDS; // 30 seconds for answering
        break;

      case "QUESTION_RESULTS":
        nextPhase = "LEADERBOARD";
        delay = 10 * SECONDS; // 10 seconds for results
        break;

      case "LEADERBOARD":
        if (questionIndex + 1 < totalQuestions) {
          // More questions available - wait for host to launch next question
          return;
        } else {
          // Last question completed
          nextPhase = "QUIZ_ENDED";
          delay = 15 * SECONDS; // 15 seconds for leaderboard
        }
        break;

      default:
        // No automatic transition needed
        return;
    }

    await this.schedule_phase_transition({
      gameSessionId,
      questionId,
      questionIndex,
      fromPhase: currentPhase,
      toPhase: nextPhase,
      executeAt: now + delay,
    });
  }

  public async schedule_phase_transition(
    data: PhaseTransitionJob,
  ): Promise<void> {
    const delay = Math.max(0, data.executeAt - Date.now());

    console.log(
      `[${this.server_id}] Scheduling phase transition from ${data.fromPhase} to ${data.toPhase} in ${delay}ms`,
    );

    try {
      const job = await this.phase_queue.add("phase-transition", data, {
        delay,
        jobId: `${data.gameSessionId}_${data.questionIndex}_${data.fromPhase}_${data.toPhase}`, // Unique job ID to prevent duplicates
      });

      console.log(
        `[${this.server_id}] Phase transition scheduled with job ID: ${job.id}`,
      );
    } catch (error) {
      console.error(
        `[${this.server_id}] Failed to schedule phase transition:`,
        error,
      );
      throw error;
    }
  }

  public async cancel_scheduled_transitions(
    gameSessionId: string,
  ): Promise<void> {
    const jobs = await this.phase_queue.getJobs(["delayed", "waiting"]);
    const relevantJobs = jobs.filter(
      (job) => job.data && job.data.gameSessionId === gameSessionId,
    );

    for (const job of relevantJobs) {
      await job.remove();
      console.log(
        `[${this.server_id}] Cancelled scheduled transition for session ${gameSessionId}, job ${job.id}`,
      );
    }
  }

  public async cleanup(): Promise<void> {
    if (this.leadership_interval) {
      clearInterval(this.leadership_interval);
    }
    await this.phase_queue.close();
  }
}
