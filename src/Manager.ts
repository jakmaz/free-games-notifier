import { ConfigManager } from "./configs/ConfigManager.js";
import { Notifier } from "./notifiers/Notifier.js";
import { GamePlatform } from "./platforms/GamePlatform.js";

export class Manager {
  private notifiers: Notifier[];
  private platforms: GamePlatform[];
  private config: ConfigManager;

  public constructor() {
    this.config = ConfigManager.getInstance();
    this.notifiers = this.config.generateNotifiers();
    this.platforms = this.config.generatePlatforms();
  }

  public async fetchAndNotify(): Promise<void> {
    console.log("Fetching and notifying...");
    console.log(this.platforms, this.notifiers);
    for (const platform of this.platforms) {
      try {
        const freeGames = await platform.fetchFreeGames();
        console.log(freeGames);
        for (const game of freeGames) {
          for (const notifier of this.notifiers) {
            await notifier.send(game);
          }
        }
      } catch (error) {
        console.error(
          `Error fetching/notifying for ${platform.constructor.name}:`,
          error,
        );
      }
    }
  }
}
