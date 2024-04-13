import { GamePlatform } from "../platforms/GamePlatform.js";
import { Notifier } from "../notifiers/Notifier.js";
import { AppConfig } from "./types/types.js";
import { Scheduler } from "../Scheduler.js";
import { ScheduledGameNotifier } from "../ScheduledGameNotifier.js";
import { FactoryRegistry } from "./FactoryRegistry.js";
import { ConfigLoader } from "./ConfigLoader.js";

export class ConfigManager {
  private config: AppConfig;
  private factoryRegistry: FactoryRegistry;

  public constructor() {
    this.factoryRegistry = new FactoryRegistry();
  }

  public loadConfig() {
    this.config = ConfigLoader.loadConfig("config/default.yaml");
  }

  private createPlatforms(): GamePlatform[] {
    const platforms: GamePlatform[] = [];

    const platformNames = this.config.mainConfiguration.platforms;

    // Iterate through each platform name defined in the configuration.
    platformNames.forEach((platformName: string) => {
      const factory = this.factoryRegistry.getPlatformFactory(platformName);
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
      const factory = this.factoryRegistry.getNotifierFactory(notifierName);
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
          `Scheduled notifier for ${platform.getName()} with ${settings.schedule.interval} interval and ${settings.schedule.cron} cron interval`,
        );
      }
    });

    return scheduler;
  }
}
