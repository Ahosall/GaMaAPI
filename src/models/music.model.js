const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  music: String,
});

module.exports = mongoose.model("Music", MusicSchema);
