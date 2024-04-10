import { GOGSettings, SteamSettings } from "../Settings.js";

export type ChannelSettings = {
  Ntfy: {
    topic: string;
    token: string;
  };
  // Add more channels as necessary
};

export type PlatformSettings = {
  Steam?: SteamSettings;
  GOG?: GOGSettings;
  // Add more platforms as necessary
};

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
