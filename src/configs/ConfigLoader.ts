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
        throw new Error(
          "Configuration format is incorrect. Please check the YAML structure.",
        );
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        // File not found error
        throw new Error(
          `Configuration file not found at '${filePath}'. Please ensure the file exists.`,
        );
      } else if (error.name === "YAMLException") {
        // YAML parsing error
        throw new Error(`Syntax error in configuration file: ${error.message}`);
      } else {
        // General error handling
        throw new Error(`Failed to read configuration: ${error.message}`);
      }
    }
  }
}
