const { gsc } = require("../../Handlers/schema");

module.exports = {
  name: "deact",
  alias: ["deactivate", "disable"],
  desc: "Disable any feature in group.",
  category: "Moderation",
  usage: "deact [antilink/nsfw/welcome]",
  react: "🔒",
  start: async (
    Akeno,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName }
  ) => {
    if (args[0] == "antilink") {
      if (!isAdmin && !isBotAdmin)
        return Akeno.sendMessage(
          m.from,
          {
            text: `Bot and *${pushName}* both must be admin in order to use this command !`,
          },
          { quoted: m }
        );
      let checkdata = await gsc.findOne({ id: m.from });
      var groupe = await Akeno.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });

      if (!checkdata) {
        await new gsc({ id: m.from, antilink: "false" }).save();
        return Akeno.sendMessage(
          m.from,
          { text: `*Successfully deactivated antilink*` },
          { quoted: m }
        );
      } else {
        if (checkdata.antilink == "false")
          return Akeno.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
        await gsc.updateOne({ id: m.from }, { antilink: "false" });
        return Akeno.sendMessage(
          m.from,
          { text: `*Antilink is disabled in this group*` },
          { quoted: m }
        );
      }
    } else if (args[0] == "nsfw") {
      if (!isAdmin)
        return m.reply(`*${pushName}* must be *Admin* to turn ON/OFF NSFW !`);
      let checkdata = await gsc.findOne({ id: m.from });
      var groupe = await Akeno.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });

      if (!checkdata) {
        await new gsc({ id: m.from, switchNSFW: "false" }).save();
        return Akeno.sendMessage(
          m.from,
          { text: `*NSFW* has been *De-Activated* in this group !` },
          { quoted: m }
        );
      } else {
        if (checkdata.switchNSFW == "false")
          return Akeno.sendMessage(
            m.from,
            { text: `*NSFW* is already *De-Activated* in this group !` },
            { quoted: m }
          );
        await gsc.updateOne({ id: m.from }, { switchNSFW: "false" });
        return Akeno.sendMessage(
          m.from,
          { text: `*NSFW* has been *De-Activated* in this group !` },
          { quoted: m }
        );
      }
    } else if (args[0] == "welcome") {
      if (!isAdmin)
        return m.reply(`*${pushName}* must be *Admin* to turn ON/OFF NSFW !`);
      let checkdata = await gsc.findOne({ id: m.from });
      var groupe = await Akeno.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });

      if (!checkdata) {
        await new gsc({ id: m.from, switchWelcome: "false" }).save();
        return Akeno.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *De-Activated* in this group!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "false")
          return Akeno.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* is not *Activated* in this group!` },
            { quoted: m }
          );
        await gsc.updateOne({ id: m.from }, { switchWelcome: "false" });
        return Akeno.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *De-Activated* in this group!`,
          },
          { quoted: m }
        );
      }
    } else {
        let buttonsntilink = [
            {
                buttonId: `${prefix}deact nsfw`,
                buttonText: { displayText: "Deactivate NSFW" },
                type: 1,
            },
            {
              buttonId: `${prefix}deact antilink`,
              buttonText: { displayText: "Deactivate Antilink" },
              type: 1,
            },
            {
                buttonId: `${prefix}deact Welcome`,
                buttonText: { displayText: "Deactivate Welcome" },
                type: 1,
              },
          ];
          let bmffg = {
            image: {url : "https://images4.alphacoders.com/917/917379.jpg"} ,
            caption: `\n*「  Group Features Deactivation  」*\n\nPlease click the button below\n\n*NSFW/Antilink/Welcome*\n`,
            footer: `*Akeno MD*`,
            buttons: buttonsntilink,
            headerType: 4,
          };
          await Akeno.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
