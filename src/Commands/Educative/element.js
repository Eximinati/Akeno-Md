const axios = require("axios")
module.exports = {
    name: "element",
    alias: ["element"],
    desc: "Gives you the info of given element",
    react: "🧣",
    usage:  `${prefa}element @user`,
    category: "Educative",
    start: async(Akeno, m,{text ,pushName,prefix}) => {
        try {
            if (!text)  return m.reply(`*Please provide an element name*`) 
            bro = await axios.get(`https://api.popcat.xyz/periodic-table?element=${text}`)
            let lol = "";
            lol += `🔴 *Elelment:* ${bro.data.name}\n`;
            lol += `⬜ *Atomic Number:* ${bro.data.atomic_number}\n`;
            lol += `🟡 *Atomic Mass:* ${bro.data.atomic_mass}\n`;
            lol += `⬛ *Symbol:* ${bro.data.symbol}\n`;
            lol += `*📖 summary:* ${bro.data.summary}\n`;
            await Akeno.sendMessage(m.from,{image:{url:bro.data.image},caption:lol},{quoted:m})      
        } catch (err) {
            console.log(err)
            return m.reply (`*${text}* isn't a valid element.`)
        }
    }
}
