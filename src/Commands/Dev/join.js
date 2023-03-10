const {isUrl} = require("../../../src/Lib/myfunc")
module.exports = {
    name: "join",
    alias: ["join"],
    desc: "Join the dedicated group",
    react: "✅",
    usage:  `${prefa}join <Group link>`,
    category: "Dev",
    start: async(Akeno, m,{isCreator,text, args}) => {
        if(!isCreator) return client.sendMessage(m.from,{text:'*Only mods can use this command*'},{quoted:m})

        if (!text) return m.reply("🔍 Please provide the group link")
        if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return m.reply("🔍 Please provide the group link")
        //  m.reply("*[chotto matte]*")
        let result = args[0].split('https://chat.whatsapp.com/')[1]
        //    const metadatag = await arus.groupMetadata(result)
        //console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)
        
        await Akeno.groupAcceptInvite(result)
        m.reply(`Joined`).catch((e)=>{
          m.reply('Unknown Error Occured')
        })
    }
}