require("../../botSettings");
const config = require("../../botSettings");
const mongoose = require("mongoose");

const mongodb= mongoose.createConnection(config.mongodb);


const GroupSchema = new mongoose.Schema({
  id: { type: String,  unique: true ,required: true },
  antilink: { type: String, default: "false" },
  nsfw: { type: String, default: "false" },
  welcomeSwitch: { type: String, default: "false" }
  })

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  ban: { type: String, default: "false" },
});

const gsc = mongodb.model("Gsc", UserSchema); // Group database
const usc =mongodb.model("Usc", GroupSchema); // User database

module.exports = { gsc, usc };
