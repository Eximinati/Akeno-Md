const axios = require("axios")
module.exports = {
    name: "google",
    alias: ["google" ],
    desc: "Google anything on whatsapp :) (not porn)",
    react: "🧣",
    usage: `${prefa}google <Search term>`,
    category: "Search",
    start: async(Akeno, m,{text ,pushName,prefix}) => {
        if (!text) return m.reply("🔎 Provide a search term");
		await axios
			.get(
				`https://www.googleapis.com/customsearch/v1?q=${text}&key=AIzaSyAKj2U-zCL-pxcpgM-2a5iQL9zKDBWs9O8&cx=baf9bdb0c631236e5`
			)
			.then((res) => {
				if (res.status !== 200) return m.reply(`🔍 Error: ${res.status}`);
				let result = ``;
				let index = 1;
				for (const item of res.data?.items) {
					result += `*👾${index}.Title* : ${item.title}\n*🔗Link* : ${item.link}\n*📖Snippet* : ${item.snippet}\n\n`;
					index++;
				}
				// return  M.reply(`🔍Command Used : ${Command.count} times\n Result for *${term}*\n\n\n ${result}`)
				return m.reply(`🔍 Result for *${text}*\n\n\n ${result}`);
			})
			.catch((err) => {
				m.reply(`🔍 Error: ${err}`);
			});
    }
}