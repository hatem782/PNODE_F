const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Project.controller");
const VerifToken = require("../middlewares/VerifToken");

router.post("/create", VerifToken.isTeacher, ProjectController.CreateProject);
router.get("/getAll/:type", ProjectController.GetAllProjectsByType);
router.get("/getAll", ProjectController.GetAllProjects);

module.exports = router;
