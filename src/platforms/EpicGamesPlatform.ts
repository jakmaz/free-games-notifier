import { JSDOM } from "jsdom";
import { EpicGamesSettings } from "../configs/types/types.js";
import { Game } from "../games/Game.js";
import { GamePlatform } from "./GamePlatform.js";
import puppeteer from "puppeteer";

export default class EpicGamesPlatform extends GamePlatform {
  constructor(settings: EpicGamesSettings) {
    super("Epic Games", settings);
  }

  // public async fetchFreeGames(): Promise<Game[]> {
  //   const searchUrl = "https://store.epicgames.com/en-US/";
  //   console.log(`Fetching free games from: ${searchUrl}`);
  //   try {
  //     const response = await fetch(searchUrl, {
  //       headers: {
  //         "User-Agent":
  //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  //       },
  //     });
  //     const bodyText = await response.text(); // Always read the text to log it if needed
  //
  //     if (!response.ok) {
  //       console.log("Response Body:", bodyText); // Log the body text for debugging
  //       throw new Error(
  //         `Failed to fetch free games from Epic Games: ${response.statusText}`,
  //       );
  //     }
  //
  //     const dom = new JSDOM(bodyText);
  //     return this.extractGames(dom.window.document);
  //   } catch (error) {
  //     this.logError(error, "Error fetching free games from Epic Games");
  //     throw error;
  //   }
  // }

  public async fetchFreeGames(): Promise<Game[]> {
    const searchUrl = "https://store.epicgames.com/en-US/free-games";
    console.log(`Fetching free games from: ${searchUrl}`);
    const dom = await this.fetchDOM(searchUrl);
    const freeGamesSection = this.getFreeGamesSection(dom);
    return this.extractGames(freeGamesSection);
  }

  private async fetchDOM(url: string): Promise<Document> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    );
    await page.goto(url, { waitUntil: "networkidle0" });
    const bodyText = await page.content();
    await browser.close();
    return new JSDOM(bodyText).window.document;
  }

  private getFreeGamesSection(document: Document): Element | null {
    return document.querySelector(".css-1myhtyb");
  }

  private extractGames(freeGamesSection: Element | null): Game[] {
    const games: Game[] = [];
    if (!freeGamesSection) {
      console.log("No free games section found");
      return games;
    }
    const offerCards = freeGamesSection.querySelectorAll(".css-g3jcms");
    offerCards.forEach((item) => {
      if (this.isMysteryGame(item)) {
        console.log("Mystery game detected, skipping...");
        return;
      }
      games.push(this.extractGameData(item));
    });
    return games;
  }

  private isMysteryGame(gameCard: Element): boolean {
    return gameCard.querySelector(".css-gyjcm9") !== null;
  }

  private extractGameData(gameCard: Element): Game {
    const anchorElement = gameCard as HTMLAnchorElement;
    const url = anchorElement.href;
    const titleElement = gameCard.querySelector(".css-119zqif");
    const title = titleElement ? titleElement.textContent : "";
    const imageElement = gameCard.querySelector(
      "img",
    ) as HTMLImageElement | null;
    const iconUrl = imageElement ? imageElement.src : undefined;
    return new Game(title, url, iconUrl);
  }
}
