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
  "/createTeacher",
  VerifToken.isSuperadmin,
  validator.createTeacherValidation,
  AllUsers.CreateUser
);
router.get(
  "/get_all",
  VerifToken.isSuperadmin,
  TeacherController.GetAllTeacher
);
router.put(
  "/update_info/:_id",
  VerifToken.isSuperadmin,
  TeacherController.UpdateTeacherToResp
);

// ######## RESPONSABLE ROUTES###########
router.post(
  "/createTeacherResponsible",
  VerifToken.isSuperadmin,
  validator.createResponsableValidation,
  AllUsers.CreateUser
);

module.exports = router;
