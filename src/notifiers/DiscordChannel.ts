import fetch from "node-fetch";
import { Notifier } from "./Notifier.js";
import { Game } from "../games/Game.js";
import { DiscordSettings } from "../configs/types/types.js";

export class DiscordChannel implements Notifier {
  private settings: DiscordSettings;

  constructor(settings: DiscordSettings) {
    this.settings = settings;
  }

  async send(game: Game): Promise<void> {
    const url = this.settings.webhookUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `🎮 **${game.title}** is now free! Click the title in the embed below to claim your game.`,
          embeds: [
            {
              title: game.title,
              url: game.url, // This makes the title of the embed a hyperlink
              color: 0x0099ff, // A color for the side strip of the embed, this is blue
              image: {
                url: game.iconUrl, // The URL to the game's photo
              },
              footer: {
                text: "Free Game Alert", // You can add a footer if you want
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send notification: ${response.statusText}`);
      }

      console.log("Notification sent successfully.");
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  }
}
