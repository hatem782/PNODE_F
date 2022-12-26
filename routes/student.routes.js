const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const AllUsers = require("../controllers/AllUsers.controller");
const validator = require("../validations/usersValidations");
const VerifToken = require("../middlewares/VerifToken");

// #################### ALUMINIE ROUTES #################
router.post(
  "/register_aluminie",
  validator.createAlumnieValidation,
  StudentController.RegisterAluminie
);

// ################ ONLY BY ADMIN ################
router.post(
  "/create",
  VerifToken.isAdmin,
  validator.createStudentValidation,
  AllUsers.CreateUser
);

router.put(
  "/change_promotion/:_id",
  VerifToken.isAdmin,
  validator.UpdateStudentValidationPromotion,
  StudentController.UpdatePromotion
);

router.put(
  "/become_deplomated/:_id",
  VerifToken.isAdmin,
  StudentController.BecomeDeplomated
);

module.exports = router;
