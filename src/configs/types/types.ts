// Define the complete configuration structure
export type AppConfig = {
  mainConfiguration: MainConfiguration;
  settings: {
    channelSettings: ChannelSettings;
    platformSettings: PlatformSettings;
  };
};

export type MainConfiguration = {
  platforms: string[];
  notificationChannel: string;
};

export type ChannelSettings = {
  Ntfy?: NtfySettings;
  Discord?: DiscordSettings;
};

export type PlatformSettings = {
  Steam?: SteamSettings;
  GOG?: GOGSettings;
};

export interface SteamSettings {
  types: string[];
}

export interface GOGSettings {
  types: string[];
}

export interface NtfySettings {
  topic: string;
  token?: string;
}

export interface DiscordSettings {
  webhook: string;
}
