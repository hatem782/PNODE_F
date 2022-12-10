const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const isStudent = require("../middlewares/isStudent");

router.post("/register_aluminie", StudentController.RegisterAluminie);
router.get("/login", StudentController.StudentLogin);
router.get("/getAll", StudentController.GetAllStudents);
router.get("/getOne/:_id", StudentController.GetOneStudent);
router.delete("/delete/:_id", StudentController.DeleteStudent);

router.put("/update/:_id", isStudent, StudentController.UpdateStudent);

module.exports = router;
