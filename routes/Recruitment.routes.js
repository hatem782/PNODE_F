const express = require("express");
const router = express.Router();
const RecruitmentController = require("../controllers/recruitment.controller");

router.post(
  "/askingForRecruitment",
  RecruitmentController.askingForRecruitment
);
router.get(
  "/GetAllTemporaryRecruitment",
  RecruitmentController.GetAllTemporaryRecruitment
);
router.get(
  "/GetAllExpertRecruitment",
  RecruitmentController.GetAllExpertRecruitment
);

module.exports = router;
