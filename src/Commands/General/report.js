const moment = require('moment-timezone')

module.exports = {
    name: "report",
    alias: ["issue"],
    desc: "To report an issue to owner",
    cool:3600,
    category: "Group",
    usage: `report <describe issue>`,
    react: "🍁",
    start: async (Akeno,m,{ text, prefix, isBotAdmin, isAdmin, pushName, metadata, args }) => {
        if(!m.isGroup){
            if (!args[0]) return m.reply(`Please provide a message to report Developers !`);
            let userTag = m.sender.split("@")[0];
            let userMess = args.join(" ");
            let userName = pushName;

            try {
                userPfp = await Akeno.profilePictureUrl(m.sender, "image");
              } catch (e) {
                userPfp = "https://images3.alphacoders.com/127/1272368.png";
              }

            let reportMessage = `              *「 Report Recieved 」*\n\n*👤 Reported By:* @${userTag}\n\n*📝 Message:* ${userMess}\n\n*📅 Date:* ${moment().tz('Asia/Kolkata').format('DD/MM/YYYY')}\n*⏰ Time:* ${moment().tz('Asia/Kolkata').format('hh:mm:ss A')}\n*🍁 Character using:* ${botName}\n\n*📌 Note: This is an automated message, please do not reply to this message to avoid blocking.*`;
            m.reply(`Sending report to main developer...\n\nIf it is a spam you might get *blocked* and *banned*.`);
            
            let devs = global.dev;

            for (let i = 0; i < devs.length; i++) {
              await Akeno.sendMessage(devs[i],{image: {url: userPfp}, caption: reportMessage,mentions: [m.sender],});
            }
        }
        else{
            if (!args[0]) return m.reply(`Please provide a message to report Developers !`);
            let userTag = m.sender.split("@")[0];
            let userMess = args.join(" ");
            let userName = pushName;
            let gcName = metadata.subject;

            try {
                ppgc = await Akeno.profilePictureUrl(m.from, "image");
              } catch {
                ppgc = "https://images3.alphacoders.com/127/1272368.png";
              }
              let reportMessage = `              *「 Report Recieved 」*\n\n*👤 Reported By:* @${userTag}\n*🧩 Group Name:* ${gcName}\n\n*📝 Message:* ${userMess}\n\n*📅 Date:* ${moment().tz('Asia/Kolkata').format('DD/MM/YYYY')}\n*⏰ Time:* ${moment().tz('Asia/Kolkata').format('hh:mm:ss A')}\n*🍁 Character using:* ${botName}\n\n*📌 Note: This is an automated message, please do not reply to this message to avoid blocking.*`;
              m.reply(`Sending report to main developer...\n\nIf it is a spam you might get *blocked* and *banned*.`);

              let devs = owner

              for (let i = 0; i < devs.length; i++) {
                await Akeno.sendMessage(devs[i],{image: {url: ppgc}, caption: reportMessage,mentions: [m.sender],});
            }
        }
    }
}