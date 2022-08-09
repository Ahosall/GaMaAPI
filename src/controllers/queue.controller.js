const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

const { add, get, queue, music } = require("../utils/functions");

// https://www.youtube.com/playlist?list=OLAK5uy_m98gLWaygi2lvmUqfQeFGz4NldCKY4qL0

module.exports = {
  post: async (req, res) => {
    let { server } = req.params;
    let { key, playlist } = req.query;
    let data;
    let isList = false;

    if (key !== undefined) {
      let { videoDetails } = await ytdl.getInfo(
        `http://www.youtube.com/watch?v=${key}`
      );
      data = {
        music: {
          key: videoDetails.videoId,
          title: videoDetails.title,
          url: videoDetails.video_url,
          thumbnails: videoDetails.thumbnails,
          author: {
            url: videoDetails.author.channel_url,
            channelID: videoDetails.author.user,
            name: videoDetails.author.name,
          },
        },
      };
    } else if (playlist !== undefined) {
      let info = await (await ytpl(`${playlist}`)).items;
      isList = true;
      data = {
        playlist: info.map((obj, index) => ({
          key: obj.id,
          title: obj.title,
          url: obj.shortUrl,
          author: obj.author,
          duration: obj.duration,
        })),
      };
    }

    await res.send({ status: 200, ...data });

    if (isList) {
      await data.playlist.map(
        async (music) => await add.musicToQueue(server, music)
      );
    } else {
      await add.musicToQueue(server, data.music);
    }
  },
  get: async (req, res) => {
    let { server } = req.params;

    const { queue } = await get.queue(server);

    await res.send({ status: 200, queue });
  },
  del: async (req, res) => {
    let { server } = req.params;

    await queue.clean(server);

    await res.send({ status: 200, message: "Queue server deleted!" });
  },
  skip: async (req, res) => {
    let { server } = req.params;
    let { pos } = req.query;

    let queue = await music.skip(server, pos ? pos : false);

    await res.send({ status: 200, queue });
  },
  back: async (req, res) => {
    let { server } = req.params;
    let { pos } = req.query;

    let queue = await music.back(server, pos ? pos : false);

    await res.send({ status: 200, queue });
  },
};
