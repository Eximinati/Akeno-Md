module.exports = {
    name: "admin",
    alias: ["admins"],
    desc: "Tags all Admins 🎖️",
    react: "🧣",
    usage: `${prefa}admin`,
    category: "General",
    start: async(Akeno, m,{text,args,groupAdmin}) => {
        let message = "       『 *Admins* 』";

    if (m.quoted) {
      message = "       『 *Attention Admins* 』";
    } else if (!text && m.quoted) {
      message = `${m.quoted ? m.quoted.msg : ""}`;
    } else if (args[0]) {
      message = `       『 *Admins* 』\n\n_🎀 Message:_ *${args.join(
        " "
      )}*`;
    } else if (text === "") {
      message = "       『 *Admins* 』";
    } else {
      message = "       『 *Admins* 』";
    }

    Akeno.sendMessage(
      m.from,
      { text: message, mentions: groupAdmin },
      { quoted: m }
    );
    }
}