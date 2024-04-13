import { AsyncTask, SimpleIntervalJob, CronJob, Job } from "toad-scheduler";
import { GamePlatform } from "./platforms/GamePlatform.js"; // Ensure the correct path
import { Notifier } from "./notifiers/Notifier.js";
import { ScheduleSettings } from "./configs/types/types.js";
import chalk from "chalk";

export class ScheduledGameNotifier {
  private job: Job;
  private platform: GamePlatform;
  private notifiers: Notifier[];
  private scheduleSettings: ScheduleSettings;

  constructor(
    platform: GamePlatform,
    notifiers: Notifier[],
    scheduleSettings: ScheduleSettings,
  ) {
    this.platform = platform;
    this.notifiers = notifiers;
    this.scheduleSettings = scheduleSettings;
    this.job = this.createJob();
  }

  private createTask(): AsyncTask {
    return new AsyncTask(
      `${this.platform.constructor.name} fetch and notify`,
      async () => {
        await this.fetchAndNotify();
      },
      (err) =>
        console.error(`Error with ${this.platform.constructor.name}:`, err),
    );
  }

  private createJob(): Job {
    const task = this.createTask();
    if (this.scheduleSettings.interval) {
      return new SimpleIntervalJob(
        { seconds: this.scheduleSettings.interval },
        task,
      );
    } else if (this.scheduleSettings.cron) {
      return new CronJob({ cronExpression: this.scheduleSettings.cron }, task);
    } else {
      throw new Error("Invalid schedule settings");
    }
  }

  public getJob(): Job {
    return this.job;
  }

  private async fetchAndNotify(): Promise<void> {
    try {
      const freeGames = await this.platform.fetchFreeGames();
      for (const game of freeGames) {
        for (const notifier of this.notifiers) {
          await notifier.send(game);
        }
      }
    } catch (error) {
      console.error(
        `Error during fetch and notify process for ${this.platform.getName()}:`,
        error,
      );
    }
  }

  printStatus() {
    const status = this.job.getStatus();
    let statusMessage = `Status of ${this.platform.getName()}: `; // Using getName() method
    switch (status) {
      case "running":
        statusMessage += chalk.green(status);
        break;
      case "stopped":
        statusMessage += chalk.red(status);
        break;
      default:
        statusMessage += chalk.yellow(status);
        break;
    }
    console.log(statusMessage);
  }
}
