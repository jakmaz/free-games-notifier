import { promises as fs } from "fs";
import { parse } from "csv-parse";
import { AsyncTask, SimpleIntervalJob, CronJob, Job } from "toad-scheduler";
import { GamePlatform } from "./platforms/GamePlatform.js";
import { Notifier } from "./notifiers/Notifier.js";
import { ScheduleSettings } from "./configs/types/types.js";
import chalk from "chalk";
import { Game } from "./games/Game.js";

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
      const freeGames: Game[] = await this.platform.fetchFreeGames();
      const archivedGames: String[] = await this.getArchivedGames();
      for (const game of freeGames) {
        if (!archivedGames.includes(game.csvString())) {
          await this.archiveGame(game);
          for (const notifier of this.notifiers) {
            await notifier.send(game);
          }
        } else {
          console.log(
            `Game ${game.title} has already been notified. Skipping...`,
          );
        }
      }
    } catch (error) {
      console.error(
        `Error during fetch and notify process for ${this.platform.getName()}:`,
        error,
      );
    }
  }

  private async getArchivedGames(): Promise<string[]> {
    const csvData = await fs.readFile("config/archive.csv", "utf-8");
    return new Promise((resolve, reject) => {
      parse(csvData, { columns: false }, (err, data: string[][]) => {
        if (err) {
          console.error(`Error parsing archive.csv: ${err}`);
          reject(err);
        } else {
          // Mapping each row to combine title and URL into a single string
          resolve(data.map((row) => `${row[0]},${row[1]}`));
        }
      });
    });
  }

  private async archiveGame(game: Game): Promise<void> {
    await fs.appendFile("config/archive.csv", `${game.csvString()}\n`);
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
