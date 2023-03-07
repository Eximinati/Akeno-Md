const { gsc } = require("../../Handlers/schema");

module.exports = {
  name: "ban",
  alias: ["banuser"],
  desc: "Ban a member",
  category: "Dev",
  usage: "ban @user",
  react: "🎀",
  start: async (Akeno,m,{text,prefix,isBotAdmin,isAdmin,mentionByTag,metadata,pushName,isCreator,args,}
  ) => {
    

    //var TaggedUser = mentionByTag[0];

    if (!text && !m.quoted) {
      return Akeno.sendMessage(
        m.from,
        { text: `Please tag a user to *Ban*!` },
        { quoted: m }
      );
    }

    if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }
    //var mentionedUser = mentionByTag;
    let GroupName = metadata.subject;
    let banreason = args.join(" ");

    if (m.quoted && !args.join(" ")) {
      banreason = "No reason provided";
    }

    if (m.quoted && args.join(" ")) {
      banreason = text;
    }

    if (banreason.includes("@")) {
      banreason = args.join(" ");
    }

    if (banreason == undefined) {
      banreason = "No reason provided";
    }
    var ownerlist = global.owner;

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    try {
        gsc
        .findOne({ id: userId })
        .then(async (user) => {
          if (!user) {
            if (
              modStatus == "true" ||
              ownerlist.includes(`${mentionedUser.split("@")[0]}`)
            )
              return Akeno.sendMessage(
                m.from,
                {
                  text: `@${
                    mentionedUser.split("@")[0]
                  } is a *Mod* and can't be banned !`,
                  mentions: [mentionedUser],
                },
                { quoted: m }
              );
            await gsc.create({
              id: userId,
              ban: true,
              reason: banreason,
              gcname: GroupName,
            });
            return Akeno.sendMessage(
              m.from,
              {
                text: `@${
                  mentionedUser.split("@")[0]
                } has been *Banned* Successfully by *${pushName}*\n\n *Reason*: ${banreason}`,
                mentions: [mentionedUser],
              },
              { quoted: m }
            );
          } else {
            if (
              modStatus == "true" ||
              ownerlist.includes(`${mentionedUser.split("@")[0]}`)
            )
              return Akeno.sendMessage(
                m.from,
                {
                  text: `@${
                    mentionedUser.split("@")[0]
                  } is a *Mod* and can't be banned !`,
                  mentions: [mentionedUser],
                },
                { quoted: m }
              );
            if (user.ban == "true")
              return Akeno.sendMessage(
                m.from,
                {
                  text: `@${mentionedUser.split("@")[0]} is already *Banned* !`,
                  mentions: [mentionedUser],
                },
                { quoted: m }
              );
            await gsc.findOneAndUpdate(
              { id: userId },
              { $set: { ban: true, reason: banreason, gcname: GroupName } },
              { new: true }
            );
            return Akeno.sendMessage(
              m.from,
              {
                text: `@${
                  mentionedUser.split("@")[0]
                } has been *Banned* Successfully by *${pushName}*\n\n *Reason*: ${banreason}`,
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
            { text: `An internal error occurred while banning the user.` },
            { quoted: m }
          );
        });
    } catch (err) {
      console.log(err);
      return Akeno.sendMessage(
        m.from,
        { text: `An internal error occurred while banning the user.` },
        { quoted: m }
      );
    }
  },
};
