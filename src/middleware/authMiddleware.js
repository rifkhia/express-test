const jwt = require("jsonwebtoken");
const { StatusCode } = require("../utils/const");
function verifyTokenUser(req, res, next) {
  const rawToken = req.headers["authorization"];
  if (!rawToken)
    return res
      .status(StatusCode.STATUS_UNAUTHORIZED)
      .json({ message: "Access denied" });
  try {
    const token = rawToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(StatusCode.STATUS_UNAUTHORIZED).json(error);
  }
}

module.exports = verifyTokenUser;
