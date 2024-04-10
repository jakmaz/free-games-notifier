import { Manager } from "./Manager.js";
import { NtfyChannel } from "./notificators/NtfyChannel.js";
import { SteamPlatform } from "./platforms/SteamPlatform.js";

// Usage
const app = new Manager(
  [new NtfyChannel({ topic: "subuc" })],
  [new SteamPlatform({ types: ["games"] })],
);

app.fetchAndNotify().catch(console.error);
