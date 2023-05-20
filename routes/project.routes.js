const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Project.controller");
const pfe_statistuqye = require("../controllers/pfe_statistuqye.controller");
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
  "/update_pfa",
  VerifToken.isTeacher,
  validator.validateUpdateProjectPFA,
  ProjectController.UpdatePFA
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
  "/approve_by_responsable/:_id",
  VerifToken.isResponsible,
  ProjectController.ValiderPFA_Responsibale
);

router.post(
  "/choisirpfa_by_student/:_id",
  VerifToken.isStudent,
  ProjectController.ChoisirPFA_Student
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
  "/get_pfa_teacher",
  VerifToken.isTeacher,
  ProjectController.GetPFATeacher
);

router.get(
  "/get_pfa_id/:id",
  VerifToken.isTeacher,
  ProjectController.getPFAById
);

router.get(
  "/get_pfa_resp",
  VerifToken.isResponsible,
  ProjectController.GetAllPFA
);
router.get(
  "/get_pfa_student",
  VerifToken.isStudent,
  ProjectController.GetAllPFAStu
);

router.get(
  "/get_pfa_admin",
  VerifToken.isAdmin,
  ProjectController.GetAllPFAAdmin
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

router.delete(
  "/delete_pfa/:_id",
  VerifToken.isTeacher,
  ProjectController.DeleteProject
);

router.get(
  "/alowed_to_pick",
  VerifToken.isStudent,
  ProjectController.isAllowedToPick
);

// statistiques for pfe

router.get("/stats_societe", VerifToken.isAdmin, pfe_statistuqye.GetBySociete);
router.get("/stats_techno", VerifToken.isAdmin, pfe_statistuqye.GetByTecho);
router.get("/stats_mention", VerifToken.isAdmin, pfe_statistuqye.GetByMention);
router.get("/stats_encad", VerifToken.isAdmin, pfe_statistuqye.GetByEnseig);
router.get("/stats_promot", VerifToken.isAdmin, pfe_statistuqye.GetByPromotion);
router.get("/stats_pays", VerifToken.isAdmin, pfe_statistuqye.GetByPays);
router.get("/global_pie", VerifToken.isAdmin, pfe_statistuqye.GlobalPie);

module.exports = router;
