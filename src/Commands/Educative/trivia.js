const axios = require("axios")
module.exports = {
    name: "trivia",
    alias: ["trivia"],
    desc: "Gives you question according to the given level",
    react: "š§ ",
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
				const reply = `š *Category: ${response.data.results[0].category}*\nā *Difficulty: ${response.data.results[0].difficulty}*\nš *Question:${response.data.results[0].question}*\n\n\nš *Answer: ${response.data.results[0].correct_answer}*\n `;
				m.reply(reply);
			})
			.catch((err) => {
				m.reply(`No such level, Baka!`);
			});
    }
}