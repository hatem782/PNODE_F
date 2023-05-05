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
  "/create_pfa",
  VerifToken.isTeacher,
  validator.validateCreatePfa,
  ProjectController.CreatePFA
);

router.post(
  "/update",
  VerifToken.isStudent,
  validator.validateUpdateProject,
  ProjectController.UpdateMyProject
);

router.post(
  "/approve_by_enseig/:_id",
  VerifToken.isTeacher,
  ProjectController.ValiderPFE_Enseignant
);

router.post(
  "/approve_by_admin/:_id",
  VerifToken.isAdmin,
  validator.validate_validate_by_adminFunc,
  ProjectController.ValiderProjet_Admin
);

router.get("/get_societes", VerifToken.isUser, ProjectController.GetSocietes);

router.get(
  "/get_pfe_student",
  VerifToken.isStudent,
  ProjectController.GetPfeStudent
);

router.get(
  "/get_stage_student",
  VerifToken.isStudent,
  ProjectController.GetStageStudent
);

router.get("/get_all", VerifToken.isUser, ProjectController.GetProjectAll);

router.delete(
  "/delete/:_id",
  VerifToken.isStudent,
  ProjectController.DeleteProject
);

module.exports = router;
