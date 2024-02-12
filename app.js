require("dotenv").config();

const express = require("express");
const userRouter = require("./src/router/userRouter");
const tokenRouter = require("./src/router/tokenRouter");

const app = express();

app.use("/user", userRouter);
app.use("/refresh", tokenRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
