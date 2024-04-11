import { Manager } from "./Manager.js";
import { NtfyChannel } from "./notifiers/NtfyChannel.js";
import { SteamPlatform } from "./platforms/SteamPlatform.js";

const test = new NtfyChannel({ topic: "subuc" });
test.send({
  title: "The Sims™ 4 Backyard Stuff",
  url: "https://store.steampowered.com/app/1235760/The_Sims_4_Backyard_Stuff/",
  iconUrl:
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1235760/header.jpg",
});
