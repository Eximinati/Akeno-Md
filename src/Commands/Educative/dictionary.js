const axios = require("axios");

module.exports = {
    name: "urbandictionary",
    alias: ["dictionary", "define"],
    desc: "Define the given word",
    react: "🧣",
    usage:  `${prefa}define <word>`,
    category: "Educative",
    start: async (Akeno, m, { text, pushName, prefix }) => {
        if (!text) return  m.reply("Please provide a word.");

        await axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
            .then((response) => {
                const define = `
                📚 *Dictionary:* ${text}\n\n
                📖 *Definition:* ${response.data[0].meanings[0].definitions[0].definition}\n\n
                💬 *Example:* ${response.data[0].meanings[0].definitions[0].example}
                *Source*: ${response.data[0].sourceUrls}
                `;
                m.reply(define);
            })
            .catch((err) => {
                m.reply(`Sorry, couldn't find any definition related to *${text}*.`);
            });
    },
};
