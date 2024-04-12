import { Scheduler } from "./Scheduler.js";
import { ConfigManager } from "./configs/ConfigManager.js";

export class Manager {
  private config: ConfigManager;
  private scheduler: Scheduler;

  public constructor() {
    this.config = ConfigManager.getInstance();
    this.scheduler = this.config.createScheduler();
  }
}
