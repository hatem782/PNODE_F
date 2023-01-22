const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const UsersController = require("../controllers/AllUsers.controller");
const AllUsers = require("../controllers/AllUsers.controller");
const validator = require("../validations/usersValidations");
const VerifToken = require("../middlewares/VerifToken");

// #################### GET PUBLIC ACCOUNTS #################
router.get("/getallpublic", StudentController.GetAllPublicAccounts);

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

router.post(
  "/create_multiple_with_excel",
  VerifToken.isAdmin,
  StudentController.CreateStudentsFromExl
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
