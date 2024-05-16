// This file defines the types used in the application

export type AppConfig = {
  mainConfiguration: MainConfiguration;
  settings: {
    channelSettings: ChannelSettings;
    platformSettings: PlatformSettings;
  };
};

export type MainConfiguration = {
  platforms: ValidPlatform[];
  notificationChannels: ValidNotificationChannel[];
};

export type ValidPlatform = "Steam" | "EpicGames" | "Gog" | "Mocked";

export type ValidNotificationChannel = "Ntfy" | "Discord";

export type ChannelSettings = {
  Ntfy?: NtfySettings;
  Discord?: DiscordSettings;
};

export type PlatformSettings = {
  Steam?: SteamSettings;
  EpicGames?: EpicGamesSettings;
  GOG?: GOGSettings;
  Mocked?: MockedSettings;
};

export type SteamSettings = {
  types: SteamGameType[];
  schedule: ScheduleSettings;
};

export type SteamGameType =
  | "games"
  | "software"
  | "dlcs"
  | "demos"
  | "soundtracks"
  | "playtests"
  | "videos"
  | "mods"
  | "hardware"
  | "bundles";

export type GOGSettings = {
  types: string[];
  schedule: ScheduleSettings;
};

export type EpicGamesSettings = {
  schedule: ScheduleSettings;
};

export type MockedSettings = {
  amountOfGames: number;
  schedule: ScheduleSettings;
};

export type NtfySettings = {
  topic: string;
  token?: string;
};

export type DiscordSettings = {
  webhookUrl: string;
};

export type ScheduleSettings = {
  interval?: number;
  cron?: string;
};
