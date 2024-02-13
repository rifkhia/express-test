const express = require("express");
const userRouter = express.Router();

const UserHandler = require("../../handler/userHandler");
const UserUseCase = require("../../usecase/userUsecase");
const UserRepository = require("../../repository/userRepository");

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userHandler = new UserHandler(userUseCase);

const verifyTokenUser = require("../../middleware/authMiddleware");

userRouter.get("/", userHandler.getUsersHandler);
userRouter.get("/profile", verifyTokenUser, userHandler.getProfileHandler);
userRouter.delete(
  "/profile",
  verifyTokenUser,
  userHandler.deleteProfileHandler,
);
userRouter.post("/login", userHandler.loginUserHandler);
userRouter.post("/register", userHandler.registerUserHandler);

module.exports = userRouter;
