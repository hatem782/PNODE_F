const GenereteToken = require("../functions/GenerateJWT");
const GenereteRefreshToken = require("../functions/GenerateRefreshToken");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.module");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    //--------------------------------------------------------------------------
    // Verify user by mail
    console.log("userName :", userName);
    console.log("password :", password);
    let user = await UserModel.findOne({ userName });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        Message: "Please verify your username and password",
        Success: false,
      });
    }
    //--------------------------------------------------------------------------
    // Verify user password
    const passMatch = await bcrypt.compare(password, user?.password);
    if (!passMatch) {
      console.log("diff password")
      return res.status(400).json({
        Message: "Please verify your username and password",
        Success: false,
      });
    }
    console.log("same password")
    const token = GenereteToken({ _id: user._id }, "2h");
    const refreshToken = GenereteRefreshToken({ _id: user._id }, "3000h");
    // await new refreshTokenModel({ refreshToken: refreshToken }).save();

    return res.status(200).json({
      Message: "Logged successfully",
      Success: true,
      data: { user, token, refreshToken },
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const RefreshToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }
  const refreshToken = req.headers.authorization.replace("Bearer", "").trim();
  if (!refreshToken) {
    return res.status(403).json({ error: "Access denied,token missing!" });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ err: "RefreshToken expired ! " });
      }
      // find in DB
      console.log(user);
      delete user.iat;
      delete user.exp;
      const accessToken = GenereteToken(user, "3600s");
      res.send({
        token: accessToken,
      });
    });
  }
};

const GetUserByToken = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      Message: `Welcome ${user.firstName} ${user.lastName}.`,
      data: user,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  GetUserByToken,
  RefreshToken,
  Login,
};
