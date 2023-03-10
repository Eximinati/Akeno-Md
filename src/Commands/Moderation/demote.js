module.exports = {
    name: "demote",
    alias: ["demote"],
    desc: "demote the tagged/mention user to admin",
    react: "🧣",
    usage: `${prefa}demote`,
    category: "Moderation",
    start: async(Akeno, m,{text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, groupAdmin}) => {
        if (!isAdmin) {
            return Akeno.sendMessage(
              m.from,
              { text: `${mess.useradmin}` },
              { quoted: m }
            );
          }
      
          if (!text && !m.quoted) {
            return Akeno.sendMessage(
              m.from,
              { text: `Please tag an user to *Demote*!` },
              { quoted: m }
            );
          } else if (m.quoted) {
            var mentionedUser = m.quoted.sender;
          } else {
            var mentionedUser = mentionByTag[0];
          }
      
          let userId = (await mentionedUser) || m.msg.contextInfo.participant;
          if (!groupAdmin.includes(userId)) {
            return Akeno.sendMessage(
              m.from,
              {
                text: `@${mentionedUser.split("@")[0]} Senpai is not an *Admin* !`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          }
      
          try {
            await Akeno.groupParticipantsUpdate(m.from, [userId], "demote").then(
              (res) =>
              Akeno.sendMessage(
                  m.from,
                  {
                    text: `Sorry @${
                      mentionedUser.split("@")[0]
                    } Senpai, you have been *Demoted* by *${pushName}* !`,
                    mentions: [mentionedUser],
                  },
                  { quoted: m }
                )
            );
          } catch (error) {
            Akeno.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
          }
    }
}