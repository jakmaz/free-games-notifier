import { GOGPlatform } from "../platforms/GOGPlatform.js";
import { GamePlatform } from "../platforms/GamePlatform.js";
import { SteamPlatform } from "../platforms/SteamPlatform.js";
import { GOGSettings, SteamSettings } from "./types/types.js";

export interface PlatformFactory {
  create(settings: any): GamePlatform;
}

export class SteamPlatformFactory implements PlatformFactory {
  create(settings: SteamSettings): GamePlatform {
    return new SteamPlatform(settings);
  }
}

export class GOGPlatformFactory implements PlatformFactory {
  create(settings: GOGSettings): GamePlatform {
    return new GOGPlatform(settings);
  }
}
