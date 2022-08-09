const Mongoose = require("mongoose");

Mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("* MongoDB connected\n");
  })
  .catch((err) => {
    console.log(err);
  });
