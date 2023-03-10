const { gsc } = require("../../Handlers/schema");

module.exports = {
  name: "act",
  alias: ["activate", "enable"],
  desc: "Enable any feature in group.",
  category: "Moderation",
  usage: "act [antilink/nsfw/welcome]",
  react: "🔓",
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
        await new gsc({ id: m.from, antilink: "true" }).save();
        Akeno.sendMessage(
          m.from,
          {
            text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Akeno.sendMessage(
          m.from,
          { text: `*Successfully activated antilink*` },
          { quoted: m }
        );
      } else {
        if (checkdata.antilink == "true")
          return Akeno.sendMessage(
            m.from,
            { text: `*Already activated.*` },
            { quoted: m }
          );
        await gsc.updateOne({ id: m.from }, { antilink: "true" });
        return Akeno.sendMessage(
          m.from,
          { text: `*Antilink is enabled in this group*` },
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
        await new gsc({ id: m.from, switchNSFW: "true" }).save();
        Akeno.sendMessage(
          m.from,
          {
            text: `*NSFW* has been *Activated* in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Akeno.sendMessage(
          m.from,
          {
            text: `*NSFW* has been *Activated* in this group!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchNSFW == "true")
          return Akeno.sendMessage(
            m.from,
            {
              text: `*NSFW* is already *Activated* in this group!\n\nType *${prefix}nsfwmenu* To get full NSFW commands list.`,
            },
            { quoted: m }
          );
        await gsc.updateOne({ id: m.from }, { switchNSFW: "true" });
        return Akeno.sendMessage(
          m.from,
          {
            text: `*NSFW* has been *Activated* in this group!\n\nType *${prefix}nsfwmenu* To get full NSFW commands list.`,
          },
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
        await new gsc({ id: m.from, switchWelcome: "true" }).save();
        Akeno.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Akeno.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "true")
          return Akeno.sendMessage(
            m.from,
            {
              text: `*Welcome/Goodbye* messages is already *Activated* in this group!`,
            },
            { quoted: m }
          );
        await gsc.updateOne({ id: m.from }, { switchWelcome: "true" });
        return Akeno.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group!`,
          },
          { quoted: m }
        );
      }
    } else {
        let buttonsntilink = [
            {
                buttonId: `${prefix}act nsfw`,
                buttonText: { displayText: "Activate NSFW" },
                type: 1,
            },
            {
              buttonId: `${prefix}act antilink`,
              buttonText: { displayText: "Activate Antilink" },
              type: 1,
            },
            {
                buttonId: `${prefix}act Welcome`,
                buttonText: { displayText: "Activate Welcome" },
                type: 1,
              },
          ];
          let bmffg = {
            image: {url : "https://images4.alphacoders.com/917/917379.jpg"} ,
            caption: `\n*「  Group Features Activation  」*\n\nPlease click the button below\n\n*NSFW/Antilink/Welcome*\n`,
            footer: `*Akeno MD*`,
            buttons: buttonsntilink,
            headerType: 4,
          };
          await Akeno.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
