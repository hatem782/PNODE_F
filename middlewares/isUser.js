const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.module");
const teacherModel = require("../models/teacher.model");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // is the user student ?
    let user = await studentModel.findOne({ _id: decoded._id });
    if (user) {
      req.user = user;
      req.userType = "students";
      next();
      return;
    }
    // is the user teacher ?
    user = await teacherModel.findOne({ _id: decoded._id });
    if (user) {
      req.user = user;
      req.userType = "teachers";
      next();
      return;
    }

    // there is no user
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};
