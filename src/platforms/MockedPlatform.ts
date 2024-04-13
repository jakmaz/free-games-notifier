import { GamePlatform } from "./GamePlatform.js";
import { MockedSettings } from "../configs/types/types.js";
import { Game } from "../games/Game.js";

export class MockedPlatform extends GamePlatform {
  constructor(settings: MockedSettings) {
    super("Mocked", settings); // Pass settings to the base class constructor
  }

  async fetchFreeGames(): Promise<Game[]> {
    const amountOfGames = this.settings.amountOfGames;
    const games: Game[] = [
      new Game(
        "Cyberpunk 2077",
        "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?",
      ),
      new Game(
        "Forza Horizon 5",
        "https://store.steampowered.com/app/1551360/Forza_Horizon_5/",
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg?",
      ),
      new Game(
        "No Man's Sky",
        "https://store.steampowered.com/app/275850/No_Mans_Sky/",
        "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header_alt_assets_21.jpg",
      ),
    ];
    return games.slice(0, amountOfGames);
  }
}
