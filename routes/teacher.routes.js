const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const TeacherController = require("../controllers/teacher.controller");
const VerifToken = require("../middlewares/VerifToken");
const validator = require("../validations/usersValidations");

// ################ TEACHER ROUTES ################
router.put(
  "/update_course",
  VerifToken.isTeacher,
  validator.CourseUpdateValidation,
  TeacherController.UpdateTeacherCourse
);

// ################ ONLY BY ADMIN ################
router.post(
  "/create",
  VerifToken.isAdmin,
  validator.createTeacherValidation,
  AllUsers.CreateUser
);

module.exports = router;
