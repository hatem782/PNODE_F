const jwt = require("jsonwebtoken");

module.exports = (data, duration) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: duration,
  });
};
