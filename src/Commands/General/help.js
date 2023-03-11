const { addTransactionCapability } = require("@adiwajshing/baileys");
const { AnimeWallpaper } = require("anime-wallpaper");
const wall = new AnimeWallpaper();
module.exports = {
    name: "help",
    alias: ["h","menu"],
    desc: "List all command",
    category: "General",
    react:"✅",
    start: async(client, m, { commands, args, prefix, text, toUpper }) => {
        
       
   const { pushName , sender } = m
        if (args[0]) {
            let data = []
            let name = args[0].toLowerCase()
            let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias.includes(name))
            if (!cmd || cmd.type == "hide") return m.reply("No Command Found")
            else data.push(`*🍁Command :* ${cmd.name.replace(/^\w/, c => c.toUpperCase())}`)
            if (cmd.alias) data.push(`*👾Alias :* ${cmd.alias.join(", ")}`) 
            if(cmd.cool) data.push(`*⏱️Cooldown:* ${cmd.cool}`)       
            if (cmd.desc) data.push(`*🧾Description :* ${cmd.desc}`)
            if (cmd.usage) data.push(`*💡Example :* ${cmd.usage.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
            var buttonss = [
				{buttonId: `${prefix}help`, buttonText: {displayText: `help`}, type: 1},]
            let buth={
                text:`*ℹ️Command Info*\n\n${data.join("\n")}`,
                footer:"made by yush",
                buttons:buttonss,
                headerType:1
            }    
            return client.sendMessage(m.from,buth,{quoted:m})
        } else {
           const { pushName, sender } = m
let cm=commands.keys()
            let category=[];
             

            for (let cmd of cm) {
                let info = commands.get(cmd);
                if (!cmd) continue;
                if (!info.category || info.category === 'private') continue;
				// if (
				// 	!info?.category ||
				// 	(info.category === "Nsfw" &&
				// 	!(nsfw.includes(m.from)))
				// )
				// 	continue;
				if (Object.keys(category).includes(info.category))
                category[info.category].push(info);
				else {
                    category[info.category] = [];
                    category[info.category].push(info);
				}
			}
        // if (!nsfw.includes(m.from)) {
        // var emo=[ "📈" ,"📖","🍁","🍀","🌊","🎵","🎟","♨️","🉐" , "⚠️",]
        // } else {
        var emo=[ "💻" ,"🛡️","🍁","🧠","📈","🎓","🌟","👥", "🔍" , "♨️","🉐" , "⚠️",]
        // } 
        const now = new Date();
        const hour = now.getHours();

        let greeting;

        if (hour >= 0 && hour < 12) {
          greeting = "Ohayou gozaimasu";
        } else if (hour >= 12 && hour < 18) {
          greeting = "Konnichiwa";
        } else {
          greeting = "Konbanwa";
        }

        // console.log(greeting);

        let txt = `
🤍 ${greeting} senpai 🤍
╭─「(づ￣ 3￣)づ」
│⋊ 𝕌𝕤𝕖𝕣: *${pushName}*
│⋊ ℕ𝕒𝕞𝕖: 𝗔𝗸𝗲𝗻𝗼 𝗺𝗱
│⋊ ℙ𝕣𝕖𝕗𝕚𝕩: ${prefix}
│⋊ 𝕆𝕨𝕟𝕖𝕣: *${prefix}mod*
│⋊ 𝕆𝕗𝕗𝕚𝕔𝕚𝕒𝕝 𝔾𝕣𝕠𝕦𝕡: Soon
╰────────────┈平和                            \n\n`
        const keys = Object.keys(category);
        for (const key of keys) {
            txt += `*${key.toUpperCase()} ${emo[keys.indexOf(key)]} :-*  \n\`\`\`${category[key]
                .map((cmd) => cmd.name).join(", ")}\`\`\`\n\n`
        }
        txt += `
──❅┈[ 𝘼𝙠𝙚𝙣𝙤 𝙗𝙤𝙩 ]┈❅───
┌────────────┈❅
 │   🧨 ᴀᴋᴇɴᴏ ᴍᴅ
 │   ©️ Ｅｘｉｍｉｎａｔｉ
└────────────┈⁂
❅┈[𝐇𝐚𝐯𝐞 𝐆𝐫𝐞𝐚𝐭 𝐃𝐚𝐲]┈❅
🎗 *Note: Use ${prefix}help <command_name> to view the command info*
        `; 

    const ari = await wall.getAnimeWall4({ title: "Akeno", type: "sfw", page: 1 })
    const arilogo = ari[Math.floor(Math.random() * ari.length)]
    global.myBotPics = arilogo;
    const Button = [
        {buttonId: `${prefix}Ari-Ani`, buttonText: {displayText: '🌟 Script',}, type: 2},
        {buttonId: `${prefix}support`, buttonText: {displayText: '🎐 Support'}, type: 1},
    ]
    let hbutto = {
        image: {url: arilogo.image},
        caption: txt,
        footer: 'Ari-Ani',
        buttons: Button,
        headerType: 4
    }

    client.sendMessage(m.from,hbutto,{quoted:m})

     }
  }
}


