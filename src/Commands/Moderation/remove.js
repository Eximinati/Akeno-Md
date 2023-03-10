module.exports = {
    name: "remove",
    alias: ["remove"],
    desc: "remove the tagged/mention user from group",
    react: "🧣",
    usage: `${prefa}remove`,
    category: "Moderation",
    start: async(Akeno, m,{text, prefix, isBotAdmin, isAdmin, mentionByTag,pushName}) => {
        if (!text && !m.quoted) return m.reply(`Please tag a user to *Remove* from group!`)
        if (!isAdmin) return Akeno.sendMessage(m.from, { text: 'Admin Only command' }, { quoted: m });
    
        if (!text && !m.quoted) {
          return Akeno.sendMessage(
            m.from,
            { text: `Please tag a user to *Remove* !` },
            { quoted: m }
          );
        } else if (m.quoted) {
          var mentionedUser = m.quoted.sender;
        } else {
          var mentionedUser = mentionByTag[0];
        }
    
        let users = (await mentionedUser) || m.msg.contextInfo.participant;
    
        try {
          await Akeno.groupParticipantsUpdate(m.from, [users], "remove").then(
            (res) =>
            Akeno.sendMessage(
                m.from,
                { text: `@${mentionedUser.split("@")[0]} has been *Removed* Successfully by *${pushName}*` },
                { quoted: m }
              )
          );
        } catch (err) {
            Akeno.sendMessage(m.from, { text: `How will i remove someone without being admin (Wake up to reality)` }, { quoted: m });
        }
    }
}