module.exports = {
    name: "hi",
    alias: ["hello","alive"],
    desc: "Say hello to bot.",
    react: "🧣",
    usage: `${prefa}hi`,
    category: "General",
    start: async(Akeno, m,{pushName,prefix}) => {
        m.reply(`Hello *${pushName}* Senpai! I'm *Akeno*. How can I help you?`)
    }
}
