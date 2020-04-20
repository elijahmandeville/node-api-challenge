const express = require("express");

const cors = require("cors");
const actionsRouter = require("./routers/actionsRouter");
const projectsRouter = require("./routers/projectsRouter");
const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()} ${req.ip}, ${req.method}, ${req.url}`
  );
  next();
}

server.get("/", (req, res) => {
  res.send(`<h2>Welcome to my API!</h2>`);
});

module.exports = server;
