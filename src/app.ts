import { DiscordChannel } from "./notifiers/DiscordChannel.js";

const test = new DiscordChannel({
  webhook: "",
});
test.send({
  title: "The Sims™ 4 Backyard Stuff",
  url: "https://store.steampowered.com/app/1235760/The_Sims_4_Backyard_Stuff/",
  iconUrl:
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1235760/header.jpg",
});
