import { SteamSettings } from "../configs/Settings.js";
import { Game } from "../games/Game.js";
import { GamePlatform } from "./GamePlatform.js";

export class SteamPlatform implements GamePlatform {
  private settings: SteamSettings;

  constructor(config: SteamSettings) {
    this.settings = config;
  }

  async fetchFreeGames(): Promise<Game[]> {
    const searchUrl = this.buildSearchUrl();

    console.log(`Fetching free games from: ${searchUrl}`);

    // Mocked response
    return [new Game("Free Game 1", "http://example.com/game1")];
  }

  private buildSearchUrl(): string {
    const baseSearchUrl =
      "https://store.steampowered.com/search/?maxprice=free&specials=1";

    const typesMap: Record<string, number> = {
      games: 998,
      software: 994,
      dlcs: 21,
      demos: 10,
      soundtracks: 990,
      playtests: 989,
      videos: 992,
      mods: 997,
      hardware: 993,
      bundles: 996,
    };

    // Map user-preferred types to their corresponding query values
    const typeQueryValues = this.settings.types
      .filter((type) => typesMap[type]) // Ensure only supported types are included
      .map((type) => typesMap[type]);

    // If no types were specified or valid, return the base URL
    if (typeQueryValues.length === 0) {
      return baseSearchUrl; // No type filtering
    }

    // Append the type filter to the base URL
    const typesQueryParam = `&category1=${typeQueryValues.join("%2C")}`;
    return `${baseSearchUrl}${typesQueryParam}`;
  }
}
