const UserUseCase = require("../usecase/userUsecase");
const UserRepository = require("../repository/userRepository");
const { StatusCode } = require("../utils/const");
const response = require("../entity/api");
const { UserRegisterDTO, UserLoginDTO } = require("../dto/users");
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

class UserHandler {
  constructor(userUseCase) {
    this.userUseCase = userUseCase;
  }
  async getUsersHandler(req, res) {
    try {
      const { perpage, page } = req.query;
      const result = await userUseCase.getUsers(perpage, page);
      return res
        .status(StatusCode.STATUS_OK)
        .json(new response.ApiResponse("success retrieving users", result));
    } catch (err) {
      return res
        .status(err.statusCode || StatusCode.STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  async getProfileHandler(req, res) {
    try {
      const { userId } = req;
      const responseData = await userUseCase.getProfile(userId);
      res
        .status(StatusCode.STATUS_OK)
        .json(
          new response.ApiResponse("success getting profile", responseData),
        );
    } catch (err) {
      return res
        .status(err.statusCode || StatusCode.STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  async deleteProfileHandler(req, res) {
    try {
      const { userId } = req;
      await userUseCase.deleteUser(userId);
      return res
        .status(StatusCode.STATUS_OK)
        .json({ message: "success delete user" });
    } catch (err) {
      return res
        .status(err.statusCode || StatusCode.STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  async loginUserHandler(req, res) {
    try {
      const { email, password } = req.body;
      const userDTO = new UserLoginDTO(email, password);
      const responseData = await userUseCase.loginUsers(userDTO);
      res.cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
      });
      return res
        .status(StatusCode.STATUS_OK)
        .json(new response.ApiResponse("success login user", responseData));
    } catch (err) {
      return res
        .status(err.statusCode || StatusCode.STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }

  async registerUserHandler(req, res) {
    try {
      const { username, email, password } = req.body;
      const userDTO = new UserRegisterDTO(username, email, password);
      const responseData = await userUseCase.registerUser(userDTO);
      res.cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
      });
      return res
        .status(StatusCode.STATUS_CREATED)
        .json(new response.ApiResponse("success register", responseData));
    } catch (err) {
      return res
        .status(err.statusCode || StatusCode.STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
}

module.exports = UserHandler;
