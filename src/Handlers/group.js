const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    unique: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const group = mongoose.model('group', groupSchema);
module.exports = group;
