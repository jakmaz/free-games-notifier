import fetch from "node-fetch";
import { Notifier } from "./Notifier.js";
import { NtfySettings } from "../configs/Settings.js";
import { Game } from "../games/Game.js";

export class NtfyChannel implements Notifier {
  private settings: NtfySettings;
  topic: string;

  constructor(settings: NtfySettings) {
    this.settings = settings;
    this.topic = settings.topic;
  }

  async send(game: Game): Promise<void> {
    const url = `https://ntfy.sh/`;

    // Constructing the message to include game details
    const data = {
      topic: this.topic,
      title: game.title,
      message: "Free game available! Click to claim.",
      click: game.url,
      attach: game.iconUrl,
      // actions: [
      //   { action: "view", label: "Claim", clear: true }, // 'title' changed to 'label', added 'clear' if needed
      //   { action: "dismiss", label: "Dismiss" }, // 'title' changed to 'label'
      // ],
    };

    // Convert the message object to a JSON string
    const messageStr = JSON.stringify(data);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: messageStr,
        headers: { "Content-Type": "application/json" }, // Changed to 'application/json'
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
