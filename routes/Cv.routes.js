const express = require("express");
const router = express.Router();
const CvController = require("../controllers/cv.controller");
const VerifToken = require("../middlewares/VerifToken");
const CvValidation = require("../validations/cv.validation");

// ################ CV ROUTES ################
router.get("/getall_for_teacher", VerifToken.isTeacher, CvController.GetAllCvs); // totest
router.post(
  "/create",
  CvValidation.create_and_update_Cv_Validation,
  VerifToken.isUser,
  CvController.CreateCv
);

router.get("/get_cv_by_user", VerifToken.isUser, CvController.getcvbyuser);
router.get("/get_cv_by_id/:_id", VerifToken.isUser, CvController.getcvbyid);

router.put(
  "/update",
  CvValidation.create_and_update_Cv_Validation,
  VerifToken.isUser,
  CvController.UpdateCv
);

// ################ ONLY BY ADMIN ################
router.get("/getall", VerifToken.isAdmin, CvController.GetAllCvs);

module.exports = router;
