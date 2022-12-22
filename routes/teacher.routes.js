const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const TeacherController = require("../controllers/teacher.controller");
const VerifToken = require("../middlewares/VerifToken");
const validator = require("../validations/usersValidations");

router.post("/create", validator.createTeacherValidation, AllUsers.CreateUser);
router.put(
  "/update_course",
  VerifToken.isTeacher,
  validator.CourseUpdateValidation,
  TeacherController.UpdateTeacherCourse
);

module.exports = router;
