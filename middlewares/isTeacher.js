const jwt = require("jsonwebtoken");
const teacherModel = require("../models/teacher.model");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await teacherModel.findOne({ _id: decoded._id });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, Message: "Unauthorized Teacher" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};
