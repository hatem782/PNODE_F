const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Project.controller");
const isTeacher = require("../middlewares/isTeacher");


router.post("/create",isTeacher,ProjectController.CreateProject);
router.get("/getAll/:type", ProjectController.GetAllProjectsByType);
router.get("/getAll", ProjectController.GetAllProjects);
router.post("/getByTeacher", ProjectController.GetProjectsByListTeachers);
router.put("/AffectStudentToProject/:idStudent/:_id", ProjectController.AffectStudentToProject);
router.put("/AffectStudentToProject/:idTeacher/:_id", ProjectController.AffectTeacherToProject);

module.exports = router;
