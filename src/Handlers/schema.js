require("../settings/config");
const config = require("../settings/config");
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
  name: { type: String },
  gcname: { type: String },
  reason: {type: String, default: "no reason" },
  addedMods: { type: String, default: "false" }
});

const modeschema = new mongoose.Schema({
  id: {type: String , unique: false, required: true , default: "1" },
  seletedCharacter: { type: String, default: "0" },
  PMchatBot: { type: String, default: "false" },
  privateMode: { type: String, default: "false" }
});


  


const gsc = mongodb.model("Gsc", UserSchema); // Group database
const usc =mongodb.model("Usc", GroupSchema) // User database
const checkmode =mongodb.model("checkmode", modeschema); // User database

module.exports = { gsc, usc , checkmode};
