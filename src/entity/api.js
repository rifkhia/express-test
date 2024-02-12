class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiResponse {
  constructor(message, data = null) {
    this.message = message;
    this.data = data;
  }
}

class JWTResponse {
  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

module.exports = {
  CustomError,
  ApiResponse,
  JWTResponse,
};
