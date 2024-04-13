import { Game } from "../games/Game.js";

export abstract class GamePlatform {
  protected settings: any;
  private name: string;

  constructor(name: string, settings: any) {
    this.settings = settings;
    this.name = name;
  }

  abstract fetchFreeGames(): Promise<Game[]>;

  getSettings(): any {
    return this.settings;
  }

  public getName(): string {
    return this.name;
  }

  // Helper method to handle common logics such as error logging
  protected logError(error: Error, message: string): void {
    console.error(`${message}:`, error);
  }
}
