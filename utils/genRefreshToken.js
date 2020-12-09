const jwt = require("jsonwebtoken");

const genRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, { expiresIn: "7d" });
};

module.exports = genRefreshToken;
