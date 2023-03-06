module.exports = {
    name: "hi",
    alias: ["hello","alive"],
    desc: "Say hello to bot.",
    react: "🧣",
    category: "Core",
    start: async(Akeno, m,{pushName,prefix}) => {
        m.reply(`Hello *${pushName}* Senpai! I'm *Akeno*. How can I help you?`)
    }
}
