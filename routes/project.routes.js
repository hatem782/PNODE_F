const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Project.controller");
const VerifToken = require("../middlewares/VerifToken");
const validator = require("../validations/projectValidations");

router.post("/create", ProjectController.CreateProject);
router.post("/create/PFE",
   validator.validateCreatePFE,
   VerifToken.isUser,
   ProjectController.CreatePFE);

router.post("/create/Stage",
            validator.validateCreateStage,
            VerifToken.isTeacher,
            ProjectController.CreateStage);

router.post("/create/PFA", 
            validator.validateCreatePFA,
            VerifToken.isTeacher,
            ProjectController.CreatePFA);

router.post("/validate/:idProject/:isValidated/:note",
                                 VerifToken.isResponsible,
                                 ProjectController.validateProject);

router.get("/stat/:critere",
                                 ProjectController.getStatProjects);

router.get("/getAll/:type", ProjectController.GetAllProjectsByType);
router.get("/getAll", ProjectController.GetAllProjects);
router.post("/getByTeacher", ProjectController.GetProjectsByListTeachers);
router.post("/GetProjectsContainingTechnologies", ProjectController.GetProjectsContainingTechnologies);
router.put("/AffectStudentToProject/:idStudent/:_id", ProjectController.AffectStudentToProject);
router.put("/AffectStudentToProject/:idTeacher/:_id", ProjectController.AffectTeacherToProject);

module.exports = router;


