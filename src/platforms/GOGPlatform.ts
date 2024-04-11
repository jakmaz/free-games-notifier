import { GOGSettings } from "../configs/types/types.js";
import { Game } from "../games/Game.js";
import { GamePlatform } from "./GamePlatform.js";

export class GOGPlatform implements GamePlatform {
  private settings: GOGSettings;

  constructor(config: GOGSettings) {
    this.settings = config;
  }
  fetchFreeGames(): Promise<Game[]> {
    throw new Error("Method not implemented.");
  }
}
