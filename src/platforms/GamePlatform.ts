import { Game } from "../games/Game.js";

export interface GamePlatform {
  fetchFreeGames(): Promise<Game[]>;
}
