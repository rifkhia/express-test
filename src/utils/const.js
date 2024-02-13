//const for code status
class StatusCode {
  static STATUS_OK = 200;
  static STATUS_CREATED = 201;
  static STATUS_BAD_REQUEST = 400;
  static STATUS_UNAUTHORIZED = 401;
  static STATUS_INTERNAL_SERVER_ERROR = 500;
}

class Role {
  static ROLE_USER = "USER";
}

class SQLError {
  static UNIQUE_ERROR = "_bt_check_unique";
}

module.exports = {
  StatusCode,
  Role,
  SQLError,
};
