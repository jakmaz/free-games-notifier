import { readFileSync } from "fs";
import { load } from "js-yaml";
import { GamePlatform } from "../platforms/GamePlatform.js";
import { Notifier } from "../notifiers/Notifier.js";
import {
  GOGPlatformFactory,
  PlatformFactory,
  SteamPlatformFactory,
} from "./PlatformFactory.js";
import { NotifierFactory } from "./NotifierFactory.js";
import { AppConfig } from "./types/types.js";

export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig; // Use the AppConfig type

  private platforms: GamePlatform[] = [];
  private platformFactoryRegistry: { [key: string]: PlatformFactory } = {};

  private notifiers: Notifier[] = [];
  private notifierFactoryRegistry: { [key: string]: NotifierFactory } = {};

  protected constructor() {
    this.config = this.loadConfig();

    this.registerPlatformFactory("Steam", new SteamPlatformFactory());
    this.registerPlatformFactory("Gog", new GOGPlatformFactory());

    // Now initialize platforms based on the configuration
    this.initializePlatforms();

    this.registerNotifierFactory("Ntfy", new NotifierFactory());
    this.initalizeNotifier();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): AppConfig {
    try {
      const configFile = readFileSync("config/default.yaml", "utf8");
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

  private initalizeNotifier(): void {
    const notifierName = this.config.mainConfiguration.notificationChannel;
    const factory = this.notifierFactoryRegistry[notifierName];
    if (factory) {
      const settings = this.config.settings.channelSettings[notifierName];
      if (settings) {
        const notififier = factory.create(settings);
        this.notifiers.push(notififier);
      } else {
        console.warn(`Settings missing for notifier: ${notifierName}`);
      }
    } else {
      console.warn(`Factory missing for notifier: ${notifierName}`);
    }
  }

  public getPlatforms(): GamePlatform[] {
    return this.platforms;
  }

  public getNotifiers(): Notifier[] {
    return this.notifiers;
  }
}
