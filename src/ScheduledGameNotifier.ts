import { AsyncTask, SimpleIntervalJob, CronJob, Job } from "toad-scheduler";
import { GamePlatform } from "./platforms/GamePlatform.js"; // Ensure the correct path
import { Notifier } from "./notifiers/Notifier.js";
import { ScheduleSettings } from "./configs/types/types.js";

export class ScheduledGameNotifier {
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

  public generateJob(): Job {
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
        `Error during fetch and notify process for ${this.platform.constructor.name}:`,
        error,
      );
    }
  }
}
