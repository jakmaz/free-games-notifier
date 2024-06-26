import EpicGamesPlatform from "../platforms/EpicGamesPlatform.js";
import { GOGPlatform } from "../platforms/GOGPlatform.js";
import { GamePlatform } from "../platforms/GamePlatform.js";
import { MockedPlatform } from "../platforms/MockedPlatform.js";
import { SteamPlatform } from "../platforms/SteamPlatform.js";
import {
  EpicGamesSettings,
  GOGSettings,
  MockedSettings,
  SteamSettings,
} from "./types/types.js";

export interface PlatformFactory {
  create(settings: any): GamePlatform;
}

export class SteamPlatformFactory implements PlatformFactory {
  create(settings: SteamSettings): GamePlatform {
    return new SteamPlatform(settings);
  }
}

export class EpicGamesPlatformFactory implements PlatformFactory {
  create(settings: EpicGamesSettings): GamePlatform {
    return new EpicGamesPlatform(settings);
  }
}

export class GOGPlatformFactory implements PlatformFactory {
  create(settings: GOGSettings): GamePlatform {
    return new GOGPlatform(settings);
  }
}
export class MockedPlatformFactory implements PlatformFactory {
  create(settings: MockedSettings): GamePlatform {
    return new MockedPlatform(settings);
  }
}
