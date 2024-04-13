import { Game } from "../games/Game.js";

export abstract class Notifier {
  /**
   * Abstract method to send notifications about a game.
   * Must be implemented by subclasses.
   */
  abstract send(game: Game): Promise<void>;

  /**
   * Logs a success message to the console.
   */
  protected logSuccess(): void {
    console.log("Notification sent successfully.");
  }

  /**
   * Logs an error message to the console.
   */
  protected logError(error: Error): void {
    console.error("Error sending notification:", error);
  }
}
