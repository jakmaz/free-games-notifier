import { Game } from "../games/Game.js";

export interface Notifier {
  send(game: Game): Promise<void>;
}
