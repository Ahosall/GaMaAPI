const router = require("express").Router();

const { get } = require("../controllers/music.controller");

router.get("/", get);

module.exports = {
  info: {
    name: "Music",
    path: "/music",
  },
  exec: router,
};
