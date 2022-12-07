const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");

router.post("/register_student", StudentController.RegisterStudent);
router.get("/getAll", StudentController.GetAllStudents);
router.get("/getOne/:id", StudentController.GetOneStudent);
router.put("/update/:id", StudentController.UpdateStudent);
router.delete("/delete/:id", StudentController.DeleteStudent);

router.post("/register_aluminie", StudentController.RegisterAluminie);

module.exports = router;
