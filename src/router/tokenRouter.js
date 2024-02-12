const express = require("express");
const cookieParser = require("cookie-parser");
const TokenUsecase = require("../usecase/tokenUsecase");
const response = require("../entity/api");

const tokenRouter = express.Router();

const tokenUseCase = new TokenUsecase();

tokenRouter.use(express.json());
tokenRouter.use(cookieParser());

tokenRouter.post("/", async (req, res) => {
  try {
    const rawToken = req.headers["authorization"];
    const refreshToken = req.cookies.refreshToken;
    const accessToken = rawToken.split(" ")[1];
    const responseData = await tokenUseCase.refreshToken(
      accessToken,
      refreshToken,
    );

    return res
      .status(200)
      .json(new response.ApiResponse("success refreshing token", responseData));
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = tokenRouter;
