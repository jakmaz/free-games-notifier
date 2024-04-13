import chalk from "chalk";
import { Scheduler } from "./Scheduler.js";
import { ConfigManager } from "./configs/ConfigManager.js";

export class Manager {
  private configManager: ConfigManager;
  private scheduler: Scheduler;

  constructor() {
    this.printWelcomeMessage();
    this.configManager = new ConfigManager();
  }
  public run(): void {
    this.loadConfig();
    this.scheduler = this.configManager.createScheduler();
    this.printSchedule();
  }

  public loadConfig(): void {
    console.log("Loading configuration...");
    try {
      this.configManager.loadConfig();
      console.log(chalk.green("Configuration loaded successfully!"));
      this.printDivider();
    } catch (error) {
      console.error(chalk.red(`Error loading configuration: ${error.message}`));
      process.exit(1);
    }
  }

  public printSchedule(): void {
    this.scheduler.printSchedule();
  }

  private printWelcomeMessage(): void {
    console.log(chalk.bold.green("Welcome to the Free Game Notifier!"));
    this.printDivider();
  }

  private printDivider(): void {
    console.log(chalk.yellow("================================="));
  }
}
