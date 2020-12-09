const jwt = require("jsonwebtoken");

const genAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15m" });
};

module.exports = genAccessToken;
