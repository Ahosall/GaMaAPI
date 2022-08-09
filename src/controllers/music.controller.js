const { get } = require("../utils/functions");

// https://www.youtube.com/playlist?list=OLAK5uy_m98gLWaygi2lvmUqfQeFGz4NldCKY4qL0

module.exports = {
  get: async (req, res) => {
    let { key } = req.query;
    if (key == undefined) return await res.sendStatus(403);

    const musicDb = await get.music(key);
    if (musicDb == null) return await res.sendStatus(404);

    const { key: id, music } = musicDb;
    await res.send({ status: 200, key: id, music });
  },
};
