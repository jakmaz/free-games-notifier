import fetch from "node-fetch";
import { Notifier } from "./Notifier.js";
import { Game } from "../games/Game.js";
import { DiscordSettings } from "../configs/types/types.js";

export class DiscordChannel extends Notifier {
  private settings: DiscordSettings;

  constructor(settings: DiscordSettings) {
    super();
    this.settings = settings;
  }

  async send(game: Game): Promise<void> {
    const url = this.settings.webhookUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🎮 **${game.title}** is now free! Click the title to claim your game.`,
          embeds: [
            {
              title: game.title,
              url: game.url,
              color: 0x0099ff,
              image: { url: game.iconUrl },
              footer: { text: "Free Game Alert" },
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send notification: ${response.statusText}`);
      }

      this.logSuccess();
    } catch (error) {
      this.logError(error);
      throw error;
    }
  }
}
