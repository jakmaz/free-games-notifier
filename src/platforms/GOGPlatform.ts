import { GamePlatform } from "./GamePlatform.js";
import { GOGSettings } from "../configs/types/types.js";
import { Game } from "../games/Game.js";

export class GOGPlatform extends GamePlatform {
  constructor(settings: GOGSettings) {
    super(settings); // Pass settings to the base class constructor
  }

  async fetchFreeGames(): Promise<Game[]> {
    // Implementation for fetching games from GOG
    throw new Error("Method not implemented."); // Placeholder for actual implementation
  }
}
