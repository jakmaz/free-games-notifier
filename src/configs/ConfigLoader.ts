import { readFileSync } from "fs";
import { load } from "js-yaml";
import { AppConfig } from "./types/types.js";

export class ConfigLoader {
  static loadConfig(filePath: string): AppConfig {
    try {
      const configFile = readFileSync(filePath, "utf8");
      const loadedConfig = load(configFile);
      if (typeof loadedConfig === "object" && loadedConfig !== null) {
        return loadedConfig as AppConfig;
      } else {
        throw new Error("Configuration format is incorrect.");
      }
    } catch (error) {
      console.error("Error reading configuration:", error);
      throw new Error("Failed to read configuration.");
    }
  }
}
