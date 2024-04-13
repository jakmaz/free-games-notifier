import chalk from "chalk";
import { Scheduler } from "./Scheduler.js";
import { ConfigManager } from "./configs/ConfigManager.js";

export class Manager {
  private config: ConfigManager;
  private scheduler: Scheduler;

  constructor() {
    this.config = new ConfigManager();
    this.loadConfig();
  }
  public run(): void {
    this.printWelcomeMessage();
    this.scheduler = this.config.createScheduler();
  }

  public loadConfig(): void {
    this.config.loadConfig();
  }

  public printSchedule(): void {
    this.scheduler.printSchedule();
  }

  private printWelcomeMessage(): void {
    console.log(chalk.bold.green("Welcome to the Free Game Notifier!"));
    this.printDivider();
  }

  private printDivider(): void {
    console.log("=================================");
  }
}
