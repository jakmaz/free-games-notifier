import { Game } from "../games/Game.js";

export abstract class GamePlatform {
  protected settings: any;

  constructor(settings: any) {
    this.settings = settings;
  }

  // Abstract method that subclasses must implement
  abstract fetchFreeGames(): Promise<Game[]>;

  // Common method available to all subclasses
  getSettings(): any {
    return this.settings;
  }

  // Helper method to handle common logics such as error logging
  protected logError(error: Error, message: string): void {
    console.error(`${message}:`, error);
  }
}
