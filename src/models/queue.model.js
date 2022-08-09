const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  server: String,
  loop: {
    type: Boolean,
    default: false,
  },
  queue: [
    {
      key: String,
      title: String,
      url: String,
      thumbnails: Array,
      author: Array,
    },
  ],
});

module.exports = mongoose.model("Queue", QueueSchema);
