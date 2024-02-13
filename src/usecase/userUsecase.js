require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCode, Role } = require("../utils/const");
const validator = require("validator");
const { CustomError, JWTResponse } = require("../entity/api");

class UserUsecase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers(perpage, page) {
    try {
      perpage = parseInt(perpage) || 0;
      page = parseInt(page) || 0;
      return await this.userRepository.fetchAllUsers(perpage, page);
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId) {
    try {
      return await this.userRepository.fetchUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async loginUsers(userDTO) {
    if (!userDTO.email || !userDTO.password) {
      throw new CustomError(
        "missing required field",
        StatusCode.STATUS_BAD_REQUEST,
      );
    }

    try {
      const user = await this.userRepository.fetchUserEmail(userDTO.email);

      if (await bcrypt.compare(userDTO.password, user.password)) {
        const accessToken = jwt.sign(
          {
            userId: user.id,
            role: Role.ROLE_USER,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5m" },
        );

        const refreshToken = jwt.sign(
          {
            userId: user.id,
            accessToken: accessToken,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );
        return new JWTResponse(accessToken, refreshToken);
      }
      throw new CustomError(
        "password missmatch",
        StatusCode.STATUS_BAD_REQUEST,
      );
    } catch (error) {
      throw error;
    }
  }

  async registerUser(userDTO) {
    if (!userDTO.username || !userDTO.password || !userDTO.email) {
      throw new CustomError(
        "missing required field",
        StatusCode.STATUS_BAD_REQUEST,
      );
    }

    if (!validator.isEmail(userDTO.email)) {
      throw new CustomError(
        "not a correct email format",
        StatusCode.STATUS_BAD_REQUEST,
      );
    }

    try {
      userDTO.password = await bcrypt.hash(userDTO.password, 10);

      await this.userRepository.insertUser(userDTO);

      const accessToken = jwt.sign(
        {
          userId: userDTO.id,
          role: Role.ROLE_USER,
        },
        process.env.JWT_SECRET,
        { expiresIn: "5m" },
      );

      const refreshToken = jwt.sign(
        {
          userId: userDTO.id,
          accessToken: accessToken,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      return new JWTResponse(accessToken, refreshToken);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await this.userRepository.deleteUser(userId);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserUsecase;
