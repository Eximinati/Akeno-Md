module.exports = {
    name: "delete",
    alias: ["del"],
    desc: "Delete the tagged message",
    react: "🧣",
    usage: `${prefa}del`,
    category: "Moderation",
    start: async(Akeno, m,{isAdmin, isBotAdmin, pushName}) => {
        if (!m.quoted)
      return Akeno.sendMessage(
        m.from,
        { text: `Please mention a message to delete !` },
        { quoted: m }
      );
    if (!isAdmin && !isBotAdmin)
      return Akeno.sendMessage(
        m.from,
        {
          text: `Bot and *${pushName}* both must be admin in order to use this command !`,
        },
        { quoted: m }
      );
    
    var { from, fromMe, id } = m.quoted;

    const key = {
      remoteJid: m.from,
      fromMe: false,
      id: m.quoted.id,
      participant: m.quoted.sender,
    };

    await Akeno.sendMessage(m.from, { delete: key });

    }
}