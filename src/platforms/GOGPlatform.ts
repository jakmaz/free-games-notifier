import { GamePlatform } from "./GamePlatform.js";
import { GOGSettings } from "../configs/types/types.js";
import { Game } from "../games/Game.js";

export class GOGPlatform extends GamePlatform {
  constructor(settings: GOGSettings) {
    super("GOG", settings);
  }

  async fetchFreeGames(): Promise<Game[]> {
    throw new Error("Method not implemented."); // Placeholder for actual implementation
  }
}
