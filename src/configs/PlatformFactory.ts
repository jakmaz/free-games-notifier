import { GOGPlatform } from "../platforms/GOGPlatform.js";
import { GamePlatform } from "../platforms/GamePlatform.js";
import { SteamPlatform } from "../platforms/SteamPlatform.js";
import { GOGSettings, SteamSettings } from "./Settings.js";

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
