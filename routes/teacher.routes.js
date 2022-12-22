const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const TeacherController = require("../controllers/teacher.controller");

const validator = require("../validations/usersValidations");

router.post("/create", validator.createTeacherValidation, AllUsers.CreateUser);
// router.put("/update/:_id", TeacherController.UpdateTeacher);
// router.delete("/delete/:_id", TeacherController.DeleteTeacher);
// router.get("/getAll", TeacherController.GetAllTeachers);
// router.get("/login", TeacherController.TeacherLogin);

module.exports = router;
