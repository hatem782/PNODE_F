const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teacher.controller");

router.post("/create", TeacherController.CreateTeacher);
router.put("/update/:_id", TeacherController.UpdateTeacher);
router.delete("/delete/:_id", TeacherController.DeleteTeacher);
router.get("/getAll", TeacherController.GetAllTeachers);
router.get("/login", TeacherController.TeacherLogin);

module.exports = router;
