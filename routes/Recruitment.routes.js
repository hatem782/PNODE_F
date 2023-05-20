const express = require("express");
const router = express.Router();
const RecruitmentController = require("../controllers/recruitment.controller");
const recruitmentValidations = require("../validations/recruitmentValidations");
const verifToken = require("../middlewares/VerifToken");
// aluminie

router.post(
  "/create",
  verifToken.isAluminie,
  recruitmentValidations.validationAskingRecruitment,
  RecruitmentController.askingForRecruitment
);

// admin
router.get(
  "/GetAllTemporaryRecruitment",
  verifToken.isAdmin,
  RecruitmentController.GetAllTemporaryRecruitment
);
router.get(
  "/GetAllExpertRecruitment",
  verifToken.isAdmin,
  RecruitmentController.GetAllExpertRecruitment
);

router.get(
  "/GetAll",
  verifToken.isSuperadmin,
  RecruitmentController.GetAll
);

module.exports = router;
