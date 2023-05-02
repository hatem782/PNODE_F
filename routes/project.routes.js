const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Project.controller");
const VerifToken = require("../middlewares/VerifToken");
const validator = require("../validations/projectValidations");

router.post(
  "/create",
  VerifToken.isStudent,
  validator.validateCreateProject,
  ProjectController.CreateProject
);

router.post(
  "/update",
  VerifToken.isStudent,
  validator.validateUpdateProject,
  ProjectController.UpdateMyProject
);

router.post(
  "/approve_by_enseig",
  VerifToken.isTeacher,
  validator.validate_validate_by_ensgFunc,
  ProjectController.ValiderPFE_Enseignant
);

router.post(
  "/approve_by_admin",
  VerifToken.isAdmin,
  validator.validate_validate_by_adminFunc,
  ProjectController.ValiderpRrojet_Admin
);

router.get("/getMy", VerifToken.isStudent, ProjectController.GetMyProjects);
router.get("/get_my_projects/:type", ProjectController.GetAllProjectsByType);
router.get("/get_pfe_teacher/", ProjectController.GetProjectsByListTeachers);

// router.post(
//   "/validate/:idProject/:isValidated/:note",
//   //VerifToken.isResponsible,
//   ProjectController.validateProject
// );

router.get("/stat/:critere", ProjectController.getStatProjects);

router.get("/getAll", ProjectController.GetAllProjects);
router.post("/getByTeacher", ProjectController.GetProjectsByListTeachers);

// router.post(
//   "/GetProjectsContainingTechnologies",
//   ProjectController.GetProjectsContainingTechnologies
// );
// router.put(
//   "/AffectStudentToProject/:idStudent/:_id",
//   ProjectController.AffectStudentToProject
// );
// router.put(
//   "/AffectStudentToProject/:idTeacher/:_id",
//   ProjectController.AffectTeacherToProject
// );

module.exports = router;
