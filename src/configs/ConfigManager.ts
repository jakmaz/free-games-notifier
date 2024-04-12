import { readFileSync } from "fs";
import { load } from "js-yaml";
import { GamePlatform } from "../platforms/GamePlatform.js";
import { Notifier } from "../notifiers/Notifier.js";
import {
  GOGPlatformFactory,
  MockedPlatformFactory,
  PlatformFactory,
  SteamPlatformFactory,
} from "./PlatformFactory.js";
import {
  DiscordNotifierFactory,
  NotifierFactory,
  NtfyNotifierFactory,
} from "./NotifierFactory.js";
import { AppConfig } from "./types/types.js";
import { Scheduler } from "../Scheduler.js";
import { ScheduledGameNotifier } from "../ScheduledGameNotifier.js";

export class ConfigManager {
  private static instance: ConfigManager;
  private config: AppConfig; // Use the AppConfig type

  private platformFactoryRegistry: { [key: string]: PlatformFactory } = {};
  private notifierFactoryRegistry: { [key: string]: NotifierFactory } = {};

  protected constructor() {
    this.config = this.loadConfig();

    this.registerPlatformFactory("Steam", new SteamPlatformFactory());
    this.registerPlatformFactory("Mocked", new MockedPlatformFactory());
    // this.registerPlatformFactory("Gog", new GOGPlatformFactory());
    this.registerNotifierFactory("Ntfy", new NtfyNotifierFactory());
    this.registerNotifierFactory("Discord", new DiscordNotifierFactory());
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

  private createPlatforms(): GamePlatform[] {
    const platforms: GamePlatform[] = [];

    const platformNames = this.config.mainConfiguration.platforms;

    // Iterate through each platform name defined in the configuration.
    platformNames.forEach((platformName: string) => {
      const factory = this.platformFactoryRegistry[platformName];
      if (factory) {
        const settings = this.config.settings.platformSettings[platformName];
        if (settings) {
          // Use the factory to create an instance of the platform with its settings.
          const platform = factory.create(settings);
          platforms.push(platform);
          console.info(`Initialized platform: ${platformName}`);
        } else {
          console.warn(`Settings missing for platform: ${platformName}`);
        }
      } else {
        console.warn(`Factory missing for platform: ${platformName}`);
      }
    });

    return platforms;
  }

  private createNotifiers(): Notifier[] {
    const notifiers: Notifier[] = [];

    const notifierNames = this.config.mainConfiguration.notificationChannels;

    // Iterate through each notifier name.
    notifierNames.forEach((notifierName: string) => {
      const factory = this.notifierFactoryRegistry[notifierName];
      if (factory) {
        const settings = this.config.settings.channelSettings[notifierName];
        if (settings) {
          // Use the factory to create an instance of the notifier with its settings.
          const notifier = factory.create(settings);
          notifiers.push(notifier);
          console.info(`Initialized notifier: ${notifierName}`);
        } else {
          console.warn(`Settings missing for notifier: ${notifierName}`);
        }
      } else {
        console.warn(`Factory missing for notifier: ${notifierName}`);
      }
    });

    return notifiers;
  }

  public createScheduler(): Scheduler {
    const scheduler = new Scheduler();
    const platforms = this.createPlatforms();
    const notifiers = this.createNotifiers();

    platforms.forEach((platform) => {
      // Access settings directly from the platform instance
      const settings = platform.getSettings();

      if (settings && settings.schedule) {
        const scheduledNotifier = new ScheduledGameNotifier(
          platform,
          notifiers,
          settings.schedule,
        );
        scheduler.addNotifier(scheduledNotifier);
        console.info(
          `Scheduled notifier for ${platform.constructor.name} with ${settings.schedule.interval} interval or ${settings.schedule.cron} cron interval`,
        );
      }
    });

    return scheduler;
  }
}
