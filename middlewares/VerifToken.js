const jwt = require("jsonwebtoken");
const usertModel = require("../models/user.module");

const isUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

const isStudent = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id, role: "STUDENT" });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

const isAluminie = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id, role: "ALUMINIE" });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

const isTeacher = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id, role: "TEACHER" });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

const isResponsible = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({
      _id: decoded._id,
      role: "RESPONSIBLE",
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({
      _id: decoded._id,
      role: "ADMIN",
    });

    if (!user) {
      user = await usertModel.findOne({
        _id: decoded._id,
        role: "SUPERADMIN",
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

const isSuperadmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(302).json({ success: false, message: "no auth" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({
      _id: decoded._id,
      role: "SUPERADMIN",
    });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(302).json({ success: false, Message: "not loged in" });
  }
};

module.exports = {
  isUser,
  isStudent,
  isAluminie,
  isTeacher,
  isResponsible,
  isAdmin,
  isSuperadmin,
};
