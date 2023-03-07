const axios = require("axios")
module.exports = {
    name: "trivia",
    alias: ["trivia"],
    desc: "Gives you question according to the given level",
    react: "🧣",
    usage: `${prefa}trivia [easy/medium/hard]`,
    category: "Educative",
    start: async(Akeno, m,{text,pushName,prefix}) => {
        if (!text) return m.reply("Give me a level, Baka!");
		
		await axios
			.get(
				`https://opentdb.com/api.php?amount=1&difficulty=${text}&type=multiple`
			)
			.then((response) => {
				// console.log(response);
				const reply = `🎀 *Category: ${response.data.results[0].category}*\n❄ *Difficulty: ${response.data.results[0].difficulty}*\n📒 *Question:${response.data.results[0].question}*\n\n\n🎋 *Answer: ${response.data.results[0].correct_answer}*\n `;
				m.reply(reply);
			})
			.catch((err) => {
				m.reply(`No such level, Baka!`);
			});
    }
}