const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");

router.post("/create", StudentController.CreateStudent);
router.get("/getAll", StudentController.GetAllStudents);
router.get("/getOne/:id", StudentController.GetOneStudent);
router.put("/update/:id", StudentController.UpdateStudent);
router.delete("/delete/:id", StudentController.DeleteStudent);

module.exports = router;
