const express = require("express");

const morgan = require("morgan");
const userRouter = require("./userRouter");
const tokenRouter = require("../../router/tokenRouter");

const app = express();

app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/refresh", tokenRouter);

module.exports = app;
