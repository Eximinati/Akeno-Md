const {evaluate} = require("mathjs")
module.exports = {
    name: "calculator",
    alias: ["calc"],
    desc: "Calulate simple math",
    react: "🧮",
    usage:  `${prefa}calc <2*3/69 cm to inch>`,
    category: "Educative",
    start: async(Akeno, m,{text ,pushName,prefix}) => {
        if (!text) return void M.reply('Provide the value to calculate, Baka!')
        const value = `${text}`
        const calc = evaluate(value);
				const textValue = `💡 *Solution for ${value} = ${calc}*`;
        await m.reply(textValue)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch(function(reason) {
                return m.reply(reason.toString());
              })
              
    }
}