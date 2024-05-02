import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Game } from "../games/Game.js";
import { GamePlatform } from "./GamePlatform.js";
import { SteamGameType, SteamSettings } from "../configs/types/types.js";

export class SteamPlatform extends GamePlatform {
  constructor(settings: SteamSettings) {
    super("Steam", settings);
  }

  public async fetchFreeGames(): Promise<Game[]> {
    const searchUrl = this.buildSearchUrl();
    console.log(`Fetching free games from: ${searchUrl}`);
    try {
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch free games from Steam: ${response.statusText}`,
        );
      }
      const data = await response.text();
      const dom = new JSDOM(data);
      return this.extractGames(dom.window.document);
    } catch (error) {
      this.logError(error, "Error fetching free games from Steam");
      throw error; // Re-throw to handle further up the chain if needed
    }
  }

  private extractGames(document: Document) {
    const games: Game[] = [];

    const items = document.querySelectorAll("a");
    items.forEach((item) => {
      const appId = item.href.split("/")[4];
      const url = `https://store.steampowered.com/app/${appId}`;
      const title = item.querySelector("span.title")?.textContent ?? "";
      const imageElement = item.querySelector(
        ".search_capsule img",
      ) as HTMLImageElement | null;
      const iconUrl = imageElement ? imageElement.src : undefined;
      console.log(appId, title);
      games.push(new Game(title, url, iconUrl));
    });
    return games;
  }

  private buildSearchUrl(): string {
    const baseSearchUrl =
      "https://store.steampowered.com/search/results/?maxprice=free&specials=1";
    const typesMap: Record<SteamGameType, number> = {
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

    // Filter out unsupported types and log warnings for each unsupported type
    const validTypes = this.settings.types.filter((type: SteamGameType) => {
      if (!typesMap[type]) {
        console.warn(
          `Unsupported type '${type}' specified in settings, skipping...`,
        );
        return false;
      }
      return true;
    });

    // Map the filtered, valid types to their corresponding query values
    const typeQueryValues = validTypes.map(
      (type: SteamGameType) => typesMap[type],
    );

    // Check if there are any valid type query values to append
    if (typeQueryValues.length === 0) {
      console.error(
        "No valid types specified in settings; returning base URL without type filtering.",
      );
      return baseSearchUrl; // Return the base URL if no valid types found
    }

    // Construct and return the full search URL with type filters
    const typesQueryParam = `&category1=${typeQueryValues.join("%2C")}`;
    return `${baseSearchUrl}${typesQueryParam}`;
  }
}
