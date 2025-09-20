import Bull from "bull";
import TransitionWorker from "../job/transition-worker";
import { transitionWorkerInstance } from "../services/init-services";
import { PhaseTransitionJob } from "../types/types";

const REDIS_URL = process.env.REDIS_URL;

export default class PhaseQueueProcessor {
  private phase_queue: Bull.Queue;
  private transition_worker: TransitionWorker;

  constructor() {
    this.phase_queue = new Bull("phase-transitions", {
      redis: REDIS_URL,
    });
    this.transition_worker = transitionWorkerInstance;
    this.start_consuming();
  }

  private start_consuming() {
    console.log("started consuming the events");
    this.phase_queue.process("phase_transition", async (job) => {
      this.transition_worker.handle_transition_phase(job.data);
    });
  }

  public async schedule_phase_transition(
    data: PhaseTransitionJob,
  ): Promise<void> {
    const delay = Math.max(0, data.executeAt - Date.now());
    try {
      await this.phase_queue.add("phase_transition", data, {
        delay,
        jobId: `${data.gameSessionId}_${data.questionIndex}_${data.fromPhase}_${data.toPhase}`,
      });
      console.log("added the data to the queuue : ", data);
    } catch (error) {
      console.error(`Failed to schedule phase transition:`, error);
    }
  }
}
