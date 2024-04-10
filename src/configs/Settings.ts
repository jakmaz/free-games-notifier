// Define SteamSettings interface
export interface SteamSettings {
  types: string[]; // Add other Steam-specific settings as needed
}

// Define GOGSettings interface
export interface GOGSettings {
  types: string[]; // Add other GOG-specific settings as needed
}

export interface NtfySettings {
  topic: string;
  token?: string; // Optional if you're using secured topics
}
