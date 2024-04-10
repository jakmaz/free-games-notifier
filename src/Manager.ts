import { Notifier } from "./notificators/Notifier.js";
import { GamePlatform } from "./platforms/GamePlatform.js";

export class Manager {
  private notifiers: Notifier[];
  private platforms: GamePlatform[];

  public constructor(notifiers: Notifier[], platforms: GamePlatform[]) {
    this.notifiers = notifiers;
    this.platforms = platforms;
  }

  public async fetchAndNotify(): Promise<void> {
    for (const platform of this.platforms) {
      try {
        const freeGames = await platform.fetchFreeGames();
        for (const game of freeGames) {
          for (const notifier of this.notifiers) {
            await notifier.send(
              `Free game found: ${game.title} on ${platform.constructor.name}`,
            );
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
