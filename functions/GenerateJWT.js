const jwt = require("jsonwebtoken");

module.exports = (data, duration) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
};
