const { AnimeWallpaper } = require("anime-wallpaper");
const wall = new AnimeWallpaper();
module.exports = {
    name: "mods",
    alias: ["owner"],
    desc: "Shows the moderators contact tag",
    react: "š§£",
    usage: `${prefa}mods`,
    category: "General",
    start: async(Akeno, m,{pushName,prefix}) => {
        const mod= global.owner
        let mo=`
*š Ari-Ani Mods š*\n`
for(let i=0;i<mod.length;i++){
    const um= await Akeno.username(mod[i])
    mo+=`\n#${i+1}\n*š¤ Username:* ${um}\n*š Contact:* http://wa.me/+${mod[i].split("@")[0]}\n\n\nāØ Akeno āØ `
}
const ari = await wall.getAnimeWall4({ title: "Akeno", type: "sfw", page: 1 })
const arilogo = ari[Math.floor(Math.random() * ari.length)]
await  Akeno.sendMessage(m.from,{image:{url: arilogo},caption:mo},{quoted:m})  
    }
}