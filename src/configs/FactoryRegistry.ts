import {
  DiscordNotifierFactory,
  NotifierFactory,
  NtfyNotifierFactory,
} from "./NotifierFactory.js";
import {
  EpicGamesPlatformFactory,
  MockedPlatformFactory,
  PlatformFactory,
  SteamPlatformFactory,
} from "./PlatformFactory.js";

export class FactoryRegistry {
  private platformFactories: Map<string, PlatformFactory> = new Map();
  private notifierFactories: Map<string, NotifierFactory> = new Map();

  constructor() {
    this.registerPlatformFactory("Steam", new SteamPlatformFactory());
    this.registerPlatformFactory("EpicGames", new EpicGamesPlatformFactory());
    this.registerPlatformFactory("Mocked", new MockedPlatformFactory());
    this.registerNotifierFactory("Ntfy", new NtfyNotifierFactory());
    this.registerNotifierFactory("Discord", new DiscordNotifierFactory());
  }

  registerPlatformFactory(name: string, factory: PlatformFactory) {
    this.platformFactories.set(name, factory);
  }

  getPlatformFactory(name: string): PlatformFactory | undefined {
    return this.platformFactories.get(name);
  }

  registerNotifierFactory(name: string, factory: NotifierFactory) {
    this.notifierFactories.set(name, factory);
  }

  getNotifierFactory(name: string): NotifierFactory | undefined {
    return this.notifierFactories.get(name);
  }
}
