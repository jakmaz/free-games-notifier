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
  notificationChannels: string[];
};

export type ChannelSettings = {
  Ntfy?: NtfySettings;
  Discord?: DiscordSettings;
};

export type PlatformSettings = {
  Steam?: SteamSettings;
  GOG?: GOGSettings;
  Mocked?: MockedSettings;
};

export interface SteamSettings {
  types: string[];
}

export interface GOGSettings {
  types: string[];
}

export interface MockedSettings {
  amountOfGames: number;
}

export interface NtfySettings {
  topic: string;
  token?: string;
}

export interface DiscordSettings {
  webhookUrl: string;
}
