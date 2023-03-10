require("dotenv").config();
let allMods = process.env.MODS;
if (!allMods) {
  allMods = "null";  
}

global.owner = allMods.split(",");
global.mongodb = process.env.MONGODB || "null";
global.sessionId = process.env.SESSION_ID || "null";
global.prefa = process.env.PREFIX || ".";
global.packname = process.env.PACKNAME || `null`;
global.author = process.env.AUTHOR || "null";
global.port = process.env.PORT || "9000";

module.exports = {
  mongodb: global.mongodb,
};