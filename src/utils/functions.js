const ytdl = require("ytdl-core");

const mMusic = require("../models/music.model");
const mQueue = require("../models/queue.model");

const create = {
  queue: async (server) => {
    return await mQueue.create({ server, loop: false, queue: [], history: [] });
  },
  music: async ({ key, url }) => {
    let { formats } = await ytdl.getInfo(
      `https://www.youtube.com/watch?v=${key}`
    );
    let nUrl = await ytdl.chooseFormat(formats, { quality: "251" }).url;

    return await mMusic.create({ key, url: nUrl });
  },
};

const get = {
  configs: async () => {
    let configs = await mQueue.findOne({ server });

    if (configs != null) {
      delete configs.queue;
      delete configs.history;
    }

    return configs;
  },
  queue: async (server) => {
    let configs = await mQueue.findOne({ server });

    if (configs != null) return configs.queue;
    else return configs;
  },
  history: async (server) => {
    let configs = await mQueue.findOne({ server });

    if (configs != null) return configs.history;
    else return configs;
  },
  music: async (key) => await mMusic.findOne({ key }),
};

const add = {
  musicToQueue: async (server, { key }) => {
    let music = await get.music(key);
    let queue = await get.queue(server);

    if (music == null) music = await create.music(key);
    if (queue == null) queue = (await create.queue(server)).queue;

    return await mQueue.findOneAndUpdate(
      { server },
      { queue: [...queue, music] }
    );
  },
  musicToHistory: async (server, { key }) => {
    let music = await get.music(key);
    let history = await get.history(server);

    if (music == null) music = await create.music(key);
    if (history == null) history = (await create.queue(server)).history;

    return await mQueue.findOneAndUpdate(
      { server },
      { history: [music, ...history] }
    );
  },
};

const remove = {
  musicFromQueue: async (server, { key }) => {
    let queue = await get.queue(server);
    let musicIndex = queue.findIndex((msc) => msc.key == key);

    add.musicToHistory(server, key);
    queue = queue.pop(musicIndex);

    return await mQueue.findOneAndUpdate(
      {
        server,
      },
      { queue }
    );
  },
  musicFromHistory: async (server, { key }) => {
    let history = await get.history(server);
    let musicIndex = queue.findIndex((msc) => msc.key == key);

    add.musicToQueue(server, key);
    history = history.pop(musicIndex);

    return await mQueue.findOneAndUpdate(
      {
        server,
      },
      { history }
    );
  },
};

const music = {
  skip: async (server, position = false) => {
    let queue = await get.queue(server);
    let pos = position ? position - 1 : 0;

    for (let x = 0; x++; x == pos) {
      await add.musicToHistory(server, queue[x]);
      await remove.musicFromQueue(server, queue[x]);
    }

    return await get.queue(server);
  },
  back: async (server, position = false) => {
    let queue = await get.queue(server);
    let pos = position ? position - 1 : 0;
    for (let x = 0; x++; x == pos) {
      await add.musicFromQueue(server, queue[pos]);
      await remove.musicToHistory(server, queue[pos]);
    }

    return await get.queue(server);
  },
};

const queue = {
  clean: async (server) =>
    await mQueue.findOneAndUpdate({ server }, { queue: [] }),
};

module.exports = { create, get, add, remove, music, queue };
