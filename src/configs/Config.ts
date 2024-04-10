import { readFileSync } from "fs";
import { load } from "js-yaml";
import { GamePlatform } from "../platforms/GamePlatform.js";
import { Notifier } from "../notificators/Notifier.js";
import {
  GOGPlatformFactory,
  PlatformFactory,
  SteamPlatformFactory,
} from "./PlatformFactory.js";
import { NotifierFactory } from "./NotifierFactory.js";
import { GOGSettings, SteamSettings } from "./Settings.js";

type ChannelSettings = {
  Ntfy: {
    topic: string;
    token: string;
  };
  // Add more channels as necessary
};

type PlatformSettings = {
  Steam?: SteamSettings;
  GOG?: GOGSettings;
  // Add more platforms as necessary
};

// Define the complete configuration structure
type AppConfig = {
  mainConfiguration: MainConfiguration;
  settings: {
    channelSettings: ChannelSettings;
    platformSettings: PlatformSettings;
  };
};

type MainConfiguration = {
  platforms: string[];
  notificationChannel: string;
};

export class Config {
  private static instance: Config;
  private config: AppConfig; // Use the AppConfig type

  private platforms: GamePlatform[] = [];
  private platformFactoryRegistry: { [key: string]: PlatformFactory } = {};

  private notifier: Notifier;
  private notifierFactoryRegistry: { [key: string]: NotifierFactory } = {};

  protected constructor() {
    this.config = this.loadConfig();

    this.registerPlatformFactory("steam", new SteamPlatformFactory());
    this.registerPlatformFactory("gog", new GOGPlatformFactory());

    // Now initialize platforms based on the configuration
    this.initializePlatforms();

    this.registerNotifierFactory("ntfy", new NotifierFactory());
  }
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private loadConfig(): AppConfig {
    try {
      const configFile = readFileSync("resources/config.yaml", "utf8");
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

  private registerPlatformFactory(
    platformName: string,
    factory: PlatformFactory,
  ): void {
    this.platformFactoryRegistry[platformName] = factory;
  }

  private registerNotifierFactory(
    notifierName: string,
    factory: NotifierFactory,
  ): void {
    this.notifierFactoryRegistry[notifierName] = factory;
  }

  private initializePlatforms(): void {
    this.config.mainConfiguration.platforms.forEach((platformName: string) => {
      const factory = this.platformFactoryRegistry[platformName];
      if (factory) {
        const settings = this.config.settings.platformSettings[platformName];
        if (settings) {
          const platform = factory.create(settings);
          this.platforms.push(platform);
        } else {
          console.warn(`Settings missing for platform: ${platformName}`);
        }
      } else {
        console.warn(`Factory missing for platform: ${platformName}`);
      }
    });
  }
}
