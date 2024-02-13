const express = require("express");
const tokenRouter = express.Router();

const TokenUsecase = require("../../usecase/tokenUsecase");
const TokenHandler = require("../../handler/tokenHandler");

const tokenUsecase = new TokenUsecase();
const tokenHandler = new TokenHandler(tokenUsecase);

tokenRouter.post("/", tokenHandler.refreshTokenHandler);

module.exports = tokenRouter;
