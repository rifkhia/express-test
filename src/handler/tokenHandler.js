const response = require("../entity/api");
const { StatusCode } = require("../utils/const");

const TokenUsecase = require("../usecase/tokenUsecase");

const tokenUsecase = new TokenUsecase();
class TokenHandler {
  constructor(tokenUsecase) {
    this.tokenUsecase = tokenUsecase;
  }

  async refreshTokenHandler(req, res) {
    try {
      const rawToken = req.headers["authorization"];
      const refreshToken = req.cookies.refreshToken;
      const accessToken = rawToken.split(" ")[1];
      const responseData = await tokenUsecase.refreshToken(
        accessToken,
        refreshToken,
      );

      return res
        .status(StatusCode.STATUS_OK)
        .json(
          new response.ApiResponse("success refreshing token", responseData),
        );
    } catch (err) {
      return res
        .status(err.statusCode || StatusCode.STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
}

module.exports = TokenHandler;
