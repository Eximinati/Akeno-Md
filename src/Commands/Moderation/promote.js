module.exports = {
    name: "promote",
    alias: ["promote"],
    desc: "promote the tagged/mention user to admin",
    react: "🧣",
    usage: `${prefa}promote`,
    category: "Moderation",
    start: async(Akeno, m,{text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName,groupAdmin}) => {
        if (!isAdmin) {
            return Akeno.sendMessage(
              m.from,
              { text: `Admin Only command` },
              { quoted: m }
            );
          }
          if (!text && !m.quoted) {
            return Akeno.sendMessage(
              m.from,
              { text: `Please tag a user to *Promote*!` },
              { quoted: m }
            );
          } else if (m.quoted) {
            var mentionedUser = m.quoted.sender;
          } else {
            var mentionedUser = mentionByTag[0];
          }
      
          let userId = (await mentionedUser) || m.msg.contextInfo.participant;
          if(groupAdmin.includes(userId)){
            return Akeno.sendMessage(
              m.from,
              { text: `@${
                mentionedUser.split("@")[0]
              } Senpai is already an *Admin* !`,mentions: [mentionedUser], },
              { quoted: m }
            );
          }
      
          try {
            await Akeno.groupParticipantsUpdate(m.from, [userId], "promote").then(
              (res) =>
              Akeno.sendMessage(
                  m.from,
                  {
                    text: `Congratulations @${
                      mentionedUser.split("@")[0]
                    } Senpai 🥳, you have been *Promoted* Successfully by *${pushName}* !`,
                    mentions: [mentionedUser],
                  },
                  { quoted: m }
                )
            );
          } catch (error) {
            Akeno.sendMessage(
              m.from,
              { text: `Bot Should be admin too (You expect bot to promote someone without being admin?)` },
              { quoted: m }
            ); 
          }
          
    }
}