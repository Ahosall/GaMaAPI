const router = require("express").Router();

const cQueue = require("../controllers/queue.controller");

// Add music to Queue
router.post("/:server/", cQueue.post);

// Get queue
router.get("/:server/", cQueue.get);

// Clean queue
router.delete("/:server/", cQueue.del);

// Skip music
router.post("/:server/skip", cQueue.skip);

// Back music
router.post("/:server/back", cQueue.back);

module.exports = {
  info: {
    name: "Queue",
    path: "/queue",
  },
  exec: router,
};
