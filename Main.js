require("./index.js");
require("./src/settings/config");

const { Collection, Function } = require("./src/Lib");
const { isUrl } = Function;
const axios = require("axios");
const Func = require("./src/Lib");
const chalk = require("chalk");
const { color } = require("./src/Lib/color");

const cool = new Collection();
const { gsc, usc, checkmode } = require("./src/Handlers/schema");
const prefix = global.prefa;
global.botName = "Akeno Md";
global.Levels = require("discord-xp");
Levels.setURL(mongodb);
global.devs= ["923087880256,923265825610"] //dont change it
console.log(color("\nBrain has been connected Successfully !\n", "aqua"));

module.exports = async (Akeno, m, commands, chatUpdate, store) => {
  try {
    let { type, isGroup, sender, from } = m;
    let body =
      type == "buttonsResponseMessage"
        ? m.message[type].selectedButtonId
        : type == "listResponseMessage"
        ? m.message[type].singleSelectReply.selectedRowId
        : type == "templateButtonReplyMessage"
        ? m.message[type].selectedId
        : m.text;
    let prat =
      type === "conversation" && body?.startsWith(prefix)
        ? body
        : (type === "imageMessage" || type === "videoMessage") &&
          body &&
          body?.startsWith(prefix)
        ? body
        : type === "extendedTextMessage" && body?.startsWith(prefix)
        ? body
        : type === "buttonsResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "listResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "templateButtonReplyMessage" && body?.startsWith(prefix)
        ? body
        : "";

    const metadata = isGroup ? await Akeno.groupMetadata(from) : {};
    const pushname = m.pushName; //|| 'NO name'
    const participants = isGroup ? metadata.participants : [sender];
    const groupAdmin = isGroup
      ? participants.filter((v) => v.admin !== null).map((v) => v.id)
      : [];
    const botNumber = await Akeno.decodeJid(Akeno.user.id);
    const isBotAdmin = m.isGroup ? groupAdmin.includes(Akeno.user?.jid) : false;
    const isAdmin = isGroup ? groupAdmin.includes(sender) : false;
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const isOwner = global.owner.includes(m.sender);
    global.suppL = "https://cutt.ly/AtlasBotSupport";

    const isCmd = body.startsWith(prefix);
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || m.msg).mimetype || " ";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const budy = typeof m.text == "string" ? m.text : "";
    const args = body.trim().split(/ +/).slice(1);
    const ar = args.map((v) => v.toLowerCase());
    let text = (q = args.join(" "));
    const groupName = m.isGroup ? metadata.subject : "";
    const cmdName = prat
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();

    const cmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      ) ||
      "";
    const icmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      );
    const mentionByTag =
      type == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];

        if (!isGroup && cmd && !iscreator)
      return m.reply("*You cant use commands in dm*");
    /*-----------------------------------Banning Configuration----------------------------------- */

    if (!isCreator) {
      let checkban =
        (await gsc.findOne({
          id: m.sender,
        })) ||
        (await new gsc({
          id: m.sender,
          name: m.pushName,
        }).save());

        if (isCmd && checkban.ban !== "false"){
          return m.reply(
            `You are *Banned* from using commands for *${checkban.reason}*.`
          );
        }
    }


    //------------------------------------------- Antilink Configuration --------------------------------------------//

    let checkdata = await gsc.findOne({
      id: m.from,
    });
    if (!checkdata) {
      let newdata = new gsc({
        id: m.from,
        antilink: "false",
      });
    }
    if (checkdata) {
      let mongoschema = checkdata.antilink || "false";
      if (m.isGroup && mongoschema == "true") {
        linkgce = await Akeno.groupInviteCode(from);
        if (budy.includes(`https://chat.whatsapp.com/${linkgce}`)) {
          m.reply(
            `This group's link detected! No issues.`
          );
        } else if (budy.includes(`https://chat.whatsapp`)) {
          bvl = `Admin has sent a link so no issues.`;
          if (isAdmin) return m.reply(bvl);
          if (m.key.fromMe) return m.reply(bvl);
          if (isCreator) return m.reply(bvl);
          kice = m.sender;
          await Akeno.groupParticipantsUpdate(m.from, [kice], "remove");
          await Akeno.sendMessage(
            from,
            {
              delete: {
                remoteJid: m.from,
                fromMe: false,
                id: m.id,
                participant: m.sender,
              },
            },
            {
              quoted: m,
            }
          );
          await gsc.updateOne(
            {
              id: m.from,
            },
            {
              antilink: "true",
            }
          );
          Akeno.sendMessage(
            from,
            {
              text: `\`\`\`「  Antilink System  」\`\`\`\n\n@${
                kice.split("@")[0]
              } Removed for sending WhatsApp group link in this group! Message has been deleted.`,
              mentions: [kice],
            },
            {
              quoted: m,
            }
          );
        } else if (isUrl(m.text) && !icmd && !isAdmin && !isCreator) {
          await Akeno.sendMessage(
            from,
            {
              delete: {
                remoteJid: m.from,
                fromMe: false,
                id: m.id,
                participant: m.sender,
              },
            },
            {
              quoted: m,
            }
          );
          m.reply(
            `Antilink is on ! To use any link related commands use my actual prefix ( ${prefix} ) ! \n\nExample : ${prefix}igdl <link> or ${prefix}ytmp4 <link>`
          );
        } else {
        }
      }
    }

    //--------------------------------------------- NSFW Configuration -----------------------------------------------//

    let nsfwstatus = await gsc.findOne({
      id: m.from,
    });
    let NSFWstatus = "false";
    if (nsfwstatus) {
      NSFWstatus = nsfwstatus.switchNSFW || "false";
    }


    //--------------------------------------------- Mode Configuration -----------------------------------------------//

    let modSTATUS = await gsc.findOne({
      id: m.sender,
    });
    var modStatus = "false";
    if (!modSTATUS) {
      await gsc.create({ id: m.sender, addedMods: "false" });
      modStatus = modSTATUS.addedMods || "false";
    }
    if (modSTATUS) {
      modStatus = modSTATUS.addedMods || "false";
    }

    let botModeSet = await checkmode.findOne({
      id: "1",
    });
    var workerMode = "false";
    if (botModeSet) {
      workerMode = botModeSet.privateMode || "false";
      if (workerMode == "true") {
        if (
          !global.owner.includes(`${m.sender.split("@")[0]}`) &&
          modStatus == "false" &&
          isCmd &&
          m.sender != botNumber
        ) {
          console.log("\nCommand Rejected ! Bot is in private mode !\n");
          return;
        }
      }
      if (workerMode == "self") {
        if (m.sender != botNumber && isCmd) {
          console.log("\nCommand Rejected ! Bot is in Self mode !\n");
          return;
        }
      }
    }

   
    /*-----------------------------------------------------------------------------------------------*/

    const flags = args.filter((arg) => arg.startsWith("--"));
    if (body.startsWith(prefix) && !icmd) {
      let Akenotext = `No such command programmed *${pushname}* senpai! Type *${prefix}help* or press the button below to get my full command list!\n`;

      let Button = [
        {
          buttonId: `${prefix}help`,
          buttonText: {
            displayText: `${prefix}help`,
          },
          type: 1,
        },
      ];
      let bmffg = {
        image: {
          url: "https://images4.alphacoders.com/917/917379.jpg",
        },
        caption: Akenotext,
        footer: `*Akeno*`,
        buttons: Button,
        headerType: 4,
      };
      Akeno.sendMessage(m.from, bmffg, {
        quoted: m,
      });
    }

    if (m.message) {
      //  addBalance(m.sender, randomNomor(574), balance)
      console.log(
        chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(m.isGroup ? m.from : "Private Chat", m.chat)
      );
    }

    if (cmd) {
      const randomXp = Math.floor(Math.random() * 3) + 1; //Random amont of XP until the number you want + 1
      const haslUp = await Levels.appendXp(m.sender, "bot", randomXp);
    }
    if (
      text.endsWith("--info") ||
      text.endsWith("--i") ||
      text.endsWith("--?")
    ) {
      let data = [];
      if (cmd.alias) data.push(`*Alias :* ${cmd.alias.join(", ")}`);

      if (cmd.desc) data.push(`*Description :* ${cmd.desc}\n`);
      if (cmd.usage)
        data.push(
          `*Example :* ${cmd.usage
            .replace(/%prefix/gi, prefix)
            .replace(/%command/gi, cmd.name)
            .replace(/%text/gi, text)}`
        );
      var buttonss = [
        {
          buttonId: `${prefix}help`,
          buttonText: {
            displayText: `${prefix}help`,
          },
          type: 1,
        },
      ];
      let buttonmess = {
        text: `*Command Info*\n\n${data.join("\n")}`,
        footer: `*${botName}*`,
        buttons: buttonss,
        headerType: 1,
      };
      let reactionMess = {
        react: {
          text: cmd.react,
          key: m.key,
        },
      };
      await Akeno.sendMessage(m.from, reactionMess).then(() => {
        return Akeno.sendMessage(m.from, buttonmess, {
          react: "🍁",
          quoted: m,
        });
      });
    }
    if (cmd.react) {
      const reactm = {
        react: {
          text: cmd.react,
          key: m.key,
        },
      };
      await Akeno.sendMessage(m.from, reactm);
    }
    if (!cool.has(m.sender)) {
      cool.set(m.sender, new Collection());
    }
    const now = Date.now();
    const timestamps = cool.get(m.sender);
    const cdAmount = (cmd.cool || 0) * 1000;

    if (timestamps.has(m.sender)) {
      const expiration = timestamps.get(m.sender) + cdAmount;

      if (now < expiration) {
        let timeLeft = (expiration - now) / 1000;
        return await Akeno.sendMessage(
          m.from,
          {
            text: `Command Rejected ! Don't Spam ! You can use command after _${timeLeft.toFixed(
              1
            )} second(s)_`,
          },
          {
            quoted: m,
          }
        );
      }
    }

    timestamps.set(m.sender, now);
    setTimeout(() => timestamps.delete(m.sender), cdAmount);

    cmd.start(Akeno, m, {
      name: "Akeno",
      metadata,
      pushName: pushname,
      participants,
      body,
      args,
      ar,
      groupName,
      botNumber,
      flags,
      isAdmin,
      groupAdmin,
      NSFWstatus,
      text,
      quoted,
      mentionByTag,
      mime,
      isBotAdmin,
      prefix,
      isCreator,
      store,
      command: cmd.name,
      commands,
      Function: Func,
      toUpper: function toUpper(query) {
        return query.replace(/^\w/, (c) => c.toUpperCase());
      },
    });
  } catch (e) {
    e = String(e);
    if (!e.includes("cmd.start")) console.error(e);
  }
};
