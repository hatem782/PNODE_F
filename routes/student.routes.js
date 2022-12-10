const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");

router.post("/register_student", StudentController.RegisterStudent);
router.post("/register_aluminie", StudentController.RegisterAluminie);
router.get("/login", StudentController.StudentLogin);
router.get("/getAll", StudentController.GetAllStudents);
router.get("/getOne/:_id", StudentController.GetOneStudent);
router.put("/update/:_id", StudentController.UpdateStudent);
router.delete("/delete/:_id", StudentController.DeleteStudent);

module.exports = router;
