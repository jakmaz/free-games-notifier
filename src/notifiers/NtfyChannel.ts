import fetch from "node-fetch";
import { Notifier } from "./Notifier.js";
import { NtfySettings } from "../configs/Settings.js";
import { Game } from "../games/Game.js";

export class NtfyChannel implements Notifier {
  private settings: NtfySettings;

  constructor(settings: NtfySettings) {
    this.settings = settings;
  }

  async send(game: Game): Promise<void> {
    const url = `https://ntfy.sh/${this.settings.topic}`;

    // Convert the game title to base64 to avoid encoding issues
    const encodedTitle = `=?UTF-8?B?${Buffer.from(game.title).toString("base64")}?=`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: "Free game available! Click to claim.",
        headers: {
          Title: encodedTitle,
          Click: game.url,
          Attach: game.iconUrl,
          Actions: `http, Claim, ${game.url}, clear=true`,
        },
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
