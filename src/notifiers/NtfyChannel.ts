import fetch from "node-fetch";
import { Notifier } from "./Notifier.js";
import { NtfySettings } from "../configs/Settings.js";

export class NtfyChannel implements Notifier {
  private settings: NtfySettings;
  topic: string;

  constructor(settings: NtfySettings) {
    this.settings = settings;
    this.topic = settings.topic;
  }

  async send(message: string): Promise<void> {
    const url = `https://ntfy.sh/${this.topic}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: message,
        headers: { "Content-Type": "text/plain" },
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
