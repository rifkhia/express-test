const express = require("express");
const dto = require("../dto/users");
const UserUseCase = require("../usecase/userUsecase");
const UserRepository = require("../repository/userRepository");
const { StatusCode } = require("../utils/const");
const response = require("../entity/api");
const verifyTokenUser = require("../middleware/authMiddleware");
const { UserRegisterDTO, UserLoginDTO } = require("../dto/users");

const userRouter = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
  try {
    const result = await userUseCase.getUsers();
    return res
      .status(200)
      .json(new response.ApiResponse("success retrieving users", result));
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

userRouter.get("/profile", verifyTokenUser, async (req, res) => {
  try {
    const { userId } = req;
    const responseData = await userUseCase.getProfile(userId);
    res
      .status(StatusCode.STATUS_OK)
      .json(new response.ApiResponse("success getting profile", responseData));
  } catch (error) {
    throw error;
  }
});

userRouter.delete("/profile", verifyTokenUser, async (req, res) => {
  try {
    const { userId } = req;
    await userUseCase.deleteUser(userId);
    res.status(StatusCode.STATUS_OK).json({ message: "success delete user" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
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
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userDTO = new dto.UserRegisterDTO(username, email, password);
    const responseData = await userUseCase.registerUser(userDTO);
    res.cookie("refreshToken", responseData.refreshToken, {
      httpOnly: true,
    });
    return res
      .status(201)
      .json(new response.ApiResponse("success register", responseData));
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = userRouter;
