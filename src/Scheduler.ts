import { CronJob, SimpleIntervalJob, ToadScheduler } from "toad-scheduler";
import { ScheduledGameNotifier } from "./ScheduledGameNotifier.js";

export class Scheduler {
  private scheduler: ToadScheduler;
  private scheduledNotifiers: ScheduledGameNotifier[] = [];

  constructor() {
    this.scheduler = new ToadScheduler();
  }

  public addNotifier(notifier: ScheduledGameNotifier): void {
    this.scheduledNotifiers.push(notifier);
    const job = notifier.generateJob(); // Create and retrieve the job from the notifier

    // Check the type of job and add it to the scheduler appropriately
    if (job instanceof SimpleIntervalJob) {
      this.scheduler.addSimpleIntervalJob(job);
    } else if (job instanceof CronJob) {
      this.scheduler.addCronJob(job);
    } else {
      throw new Error("Unsupported job type");
    }
  }
}
