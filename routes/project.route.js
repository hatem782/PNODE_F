const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Project.controller");
const isTeacher = require("../middlewares/isTeacher");


router.post("/create",isTeacher,ProjectController.CreateProject);
router.get("/getAll/:type", ProjectController.GetAllProjectsByType);
router.get("/getAll", ProjectController.GetAllProjects);

module.exports = router;
