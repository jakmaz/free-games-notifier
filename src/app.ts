import { Manager } from "./Manager.js";
import { NtfyChannel } from "./notifiers/NtfyChannel.js";
import { SteamPlatform } from "./platforms/SteamPlatform.js";

// const app = new Manager();
//
// app.fetchAndNotify().catch(console.error);

const platform = new SteamPlatform({ types: [""] });
console.log(platform.fetchFreeGames());
