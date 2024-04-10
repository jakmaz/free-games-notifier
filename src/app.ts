import { Manager } from "./Manager.js";
import { NtfyChannel } from "./notifiers/NtfyChannel.js";
import { SteamPlatform } from "./platforms/SteamPlatform.js";
// Usage
// const app = new Manager(
//   [new NtfyChannel({ topic: "subuc" })],
//   [new SteamPlatform({ types: ["games"] })],
// );

const app = new Manager();

app.fetchAndNotify().catch(console.error);
