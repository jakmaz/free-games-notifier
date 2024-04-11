import fetch from "node-fetch";
import { JSDOM } from "jsdom";
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

    const response = await fetch(searchUrl);
    const data = await response.text(); // The response is directly usable
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const games: Game[] = [];

    const items = document.querySelectorAll("a");
    items.forEach((item) => {
      // const icon =
      //   item
      //     .querySelector("div.search_capsule img")
      //     ?.srcset.split(", ")
      //     .pop()
      //     ?.split(" ")[0] ?? "";
      const appId = item.href.split("/")[4];
      const url = `https://store.steampowered.com/app/${appId}`;
      const title = item.querySelector("span.title")?.textContent ?? "";
      console.log(appId, title);
      games.push(
        new Game(
          title,
          url,
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1235760/header.jpg?t=1711660625",
        ),
      );
    });

    return games;
  }

  private buildSearchUrl(): string {
    const baseSearchUrl =
      "https://store.steampowered.com/search/results/?maxprice=free&specials=1";

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
