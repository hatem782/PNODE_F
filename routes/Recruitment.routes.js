const express = require("express");
const router = express.Router();
const RecruitmentController = require("../controllers/recruitment.controller");
const recruitmentValidations = require("../validations/recruitmentValidations");
const verifToken = require("../middlewares/VerifToken");
// aluminie

router.post(
  "/create",
  verifToken.isAdmin,
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
  RecruitmentController.GetAllExpertRecruitment
);

module.exports = router;
