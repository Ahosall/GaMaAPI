require("dotenv").config();
console.clear();

const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { join } = require("path");
const { readdirSync } = require("fs");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

console.log("Initializing...\n");

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database
require("./services/mongo");

// Routes
console.log("Loading routes");

console.log(` - Main (/)`);
app.get("/api", (req, res) => {
  res.send({ im: "alive" });
});

readdirSync(join(__dirname, "routes")).forEach((f) => {
  const { info, exec } = require(`${join(__dirname, "routes")}/${f}`);
  console.log(` - ${info.name} (${info.path})`);
  app.use("/api" + info.path, exec);
});

app.get("**", (req, res) => {
  res.sendStatus(403);
});

// Server
server.listen(port);
server.on("listening", () =>
  console.log("\nAPI listening on http://localhost:" + port + "/api\n")
);
server.on("error", (err) => console.log(err));
