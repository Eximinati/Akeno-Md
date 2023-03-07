const { AnimeWallpaper } = require("anime-wallpaper");
const wall = new AnimeWallpaper();
module.exports = {
    name: "help",
    alias: ["h","menu"],
    desc: "List all command",
    category: "General",
    usage: `${prefa}help`,
    react:"✅",
    start: async(Akeno, m, { commands, args, prefix, text, toUpper }) => {
        //do something
  }
}