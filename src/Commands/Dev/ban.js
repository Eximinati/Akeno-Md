const { gsc } = require("../../Handlers/schema");

module.exports = {
  name: "ban",
  alias: ["banuser"],
  desc: "Ban a member",
  category: "Dev",
  usage:  `${prefa}ban @user`,
  react: "🎀",
  start: async (Akeno,m,{text,prefix,isBotAdmin,isAdmin,mentionByTag,metadata,pushName,isCreator,args,}) => {
    //do something
  }
};
