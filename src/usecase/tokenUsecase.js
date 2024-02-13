const jwt = require("jsonwebtoken");
const { CustomError, JWTResponse } = require("../entity/api");
const { StatusCode, Role } = require("../utils/const");

class TokenUsecase {
  async refreshToken(accessToken, refreshToken) {
    const refreshTokenDecoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET,
    );
    if (refreshTokenDecoded.accessToken !== accessToken) {
      throw new CustomError(
        "access token with refresh token missmatch",
        StatusCode.STATUS_BAD_REQUEST,
      );
    }
    const newAccessToken = jwt.sign(
      {
        userId: refreshTokenDecoded.userId,
        role: Role.ROLE_USER,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" },
    );

    const newRefreshToken = jwt.sign(
      {
        userId: refreshTokenDecoded.userId,
        accessToken: newAccessToken,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return new JWTResponse(newAccessToken, newRefreshToken);
  }
}

module.exports = TokenUsecase;
