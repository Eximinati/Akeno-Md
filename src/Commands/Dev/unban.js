const { gsc } = require("../../Handlers/schema");

module.exports = {
  name: "unban",
  alias: ["unban"],
  desc: "unaban the tagged user",
  react: "✅",
  usage: `${prefa}unban @user`,
  category: "Dev",
  start: async (
    Akeno,
    m,
    {
      text,
      prefix,
      isBotAdmin,
      isAdmin,
      mentionByTag,
      pushName,
      isCreator,
    }
  ) => {
    if (!isCreator)
      return Akeno.sendMessage(
        m.from,
        { text: "Sorry, only *Mods* can use this command !" },
        { quoted: m }
      );

      if (!text && !m.quoted) {
        return Akeno.sendMessage(
          m.from,
          { text: `Please tag a user to *Unban*!` },
          { quoted: m }
        );
      } else if (m.quoted) {
        var mentionedUser = m.quoted.sender;
      } else {
        var mentionedUser = mentionByTag[0];
      }

      let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    try {
      gsc
        .findOne({ id: userId })
        .then(async (user) => {
          if (!user) {
            return Akeno.sendMessage(
              m.from,
              {
                text: `@${mentionedUser.split("@")[0]} is not *Banned* !`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          } else {
            if (user.ban == "false")
              return Akeno.sendMessage(
                m.from,
                {
                  text: `@${mentionedUser.split("@")[0]} is not *Banned* !`,
                  mentions: [mentionedUser],
                },
                { quoted: m }
              );
            await gsc.findOneAndUpdate(
              { id: userId },
              { ban: false },
              { new: true }
            );
            return Akeno.sendMessage(
              m.from,
              {
                text: `@${
                  mentionedUser.split("@")[0]
                } has been *Unbanned* Successfully! by *${pushName}*`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          return Akeno.sendMessage(
            m.from,
            { text: `An internal error occurred while Unbanning the user.` },
            { quoted: m }
          );
        });
    } catch (err) {
      console.log(err);
      return Akeno.sendMessage(
        m.from,
        { text: `An internal error occurred while Unbanning the user.` },
        { quoted: m }
      );
    }
  },
};
