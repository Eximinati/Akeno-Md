module.exports = {
    name: "broadcast",
    alias: ["bc"],
    desc: "Give owner message to all bot groups",
    usage:  `${prefa}bc <Announcement>`,
    react: "🧣",
    category: "Dev",
    start: async(Akeno, m,{text,modStatus, isBotAdmin ,participants ,args,pushName,isCreator,prefix}) => {
        if (modStatus == "false" && !isCreator)
        return Akeno.sendMessage(
            m.from,
            { text: "Sorry, only my *Devs* and *Mods* can use this command !" },
            { quoted: m }
            );
            if (!text && !m.quoted)

            return Akeno.sendMessage(m.from,{text: `Please provide the Broadcast Message.\n\nExample: ${prefix}bc Hello World!`,},{ quoted: m });
          
              const broadcastText = m.quoted ? m.quoted.msg : args ? args.join(" ") : "";
          
              let FetchGC = await Akeno.groupFetchAllParticipating();
              let group = Object.entries(FetchGC)
                .slice(0)
                .map((entry) => entry[1]);
              let anu = group.map((v) => v.id);
              m.reply(`✅ Broadcast Message sent to *${anu.length} groups*.`);
              let count = 0;
              for (let i of anu) {
                let txt = `*⚡「${botName} BROADCAST」⚡*\n\n*🧩 Message:* ${broadcastText}\n\n\n*🔰 Regards ~ ${pushName}*`;
          
                const intervalId = setInterval(() => {
                    Akeno.sendMessage(i, {
                    video: { url: "https://telegra.ph/file/1c333a18f4578c924d78d.mp4" },
                    gifPlayback: true,
                    caption: txt,
                    mentions: participants.map((a) => a.id),
                  });
                  if (++count === anu.length) {
                    clearInterval(intervalId);
                  }
                }, 800);
              }
          
              m.reply(`*Broadcasting message to ${anu.length} groups completed !*`);
                      
    }
}