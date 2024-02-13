const db = require("../repository/config.js");
const { StatusCode, SQLError } = require("../utils/const");

const { CustomError } = require("../entity/api");

class UserRepository {
  async fetchAllUsers(perpage, page) {
    try {
      if (perpage !== 0 && page !== 0) {
        const users = await db.query(
          "SELECT id, username, email FROM users LIMIT $1 OFFSET $2",
          [perpage, (page - 1) * perpage],
        );
        return users.rows;
      }
      const users = await db.query("SELECT id, username, email FROM users");
      return users.rows;
    } catch (error) {
      console.log(error);
      throw new CustomError(
        "error while retrieving users",
        StatusCode.STATUS_INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchUser(userId) {
    try {
      const user = await db.query(
        "SELECT id, username, email FROM users WHERE id = $1",
        [userId],
      );
      if (user.rowCount === 0) {
        throw new CustomError(
          "no user found using current id",
          StatusCode.STATUS_BAD_REQUEST,
        );
      }
      return user.rows[0];
    } catch (err) {
      if (err.message === "no users found using current id") {
        throw new CustomError(
          "no users found using current id",
          StatusCode.STATUS_BAD_REQUEST,
        );
      }
      throw new CustomError(
        "error while retrieving users",
        StatusCode.STATUS_INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchUserEmail(email) {
    try {
      const users = await db.query(
        "SELECT id, username, email, password FROM users where email = $1",
        [email],
      );
      if (users.rowCount === 0) {
        throw new CustomError(
          "no users found using current email",
          StatusCode.STATUS_BAD_REQUEST,
        );
      }
      return users.rows[0];
    } catch (error) {
      if (error.message === "no users found using current email") {
        throw new CustomError(
          "no users found using current email",
          StatusCode.STATUS_BAD_REQUEST,
        );
      }
      throw new CustomError(
        "error while retrieving users",
        StatusCode.STATUS_INTERNAL_SERVER_ERROR,
      );
    }
  }

  async insertUser(user) {
    try {
      const value = [user.id, user.username, user.email, user.password];
      await db.query("INSERT INTO users VALUES($1, $2, $3, $4)", value);
    } catch (error) {
      if (error.routine.includes(SQLError.UNIQUE_ERROR)) {
        throw new CustomError(
          "email or username already taken",
          StatusCode.STATUS_BAD_REQUEST,
        );
      }
      throw new CustomError(error, StatusCode.STATUS_INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(userId) {
    try {
      await db.query("DELETE FROM users WHERE id = $1", [userId]);
    } catch (error) {
      throw new CustomError(error, StatusCode.STATUS_INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = UserRepository;
