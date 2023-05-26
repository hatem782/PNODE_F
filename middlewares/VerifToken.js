const jwt = require("jsonwebtoken");
const usertModel = require("../models/user.module");

const isUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isStudent = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
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
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isAluminie = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id, role: "ALUMINIE" });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isSuperThanStudent = async (req, res, next) => {
  const allowed_roles = ["TEACHER", "RESPONSIBLE", "SUPERADMIN", "ADMIN"];
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id });
    console.log(user);
    if (!user || allowed_roles.indexOf(user.role) === -1) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isResponsible = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
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
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isTeacher = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({ _id: decoded._id, role: "TEACHER" });
    if (!user) {
      return res.status(401).json({ success: false, Message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let user = await usertModel.findOne({
      _id: decoded._id,
      role: "ADMIN",
    });

    // here we have to test the permission
    /*if (user) {
      const action = req.baseUrl.split("/")[2];
      const index = user.permessions.indexOf(action);
      if (index === -1) {
        return res
          .status(401)
          .json({ success: false, Message: "Unauthorized" });
      }
    } else {
      user = await usertModel.findOne({
        _id: decoded._id,
        role: "SUPERADMIN",
      });
    }*/

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
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

const isSuperadmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
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
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, Message: "Unauthorized" });
  }
};

module.exports = {
  isUser,
  isStudent,
  isAluminie,
  isTeacher,
  isAdmin,
  isSuperadmin,
  isResponsible,
  isSuperThanStudent,
};
