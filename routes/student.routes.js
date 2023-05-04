const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const UsersController = require("../controllers/AllUsers.controller");
const AllUsers = require("../controllers/AllUsers.controller");
const validator = require("../validations/usersValidations");
const VerifToken = require("../middlewares/VerifToken");

// #################### GET PUBLIC ACCOUNTS #################
router.get("/getallpublic", StudentController.GetAllPublicAccounts);

// ########## GET All STUDENTS ACCOUNTS BY ALL BUT STU/ALU ###########
router.get(
  "/getall",
  VerifToken.isSuperThanStudent,
  StudentController.GetAllAccounts
);

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
  "/update_student/:_id",
  VerifToken.isAdmin,
  validator.createStudentValidation,
  StudentController.UpdatePromotion
);

router.put(
  "/become_deplomated/:_id",
  VerifToken.isAdmin,
  validator.UpdateDiplomeValidation,
  StudentController.BecomeDeplomated
);

router.put(
  "/update_year_univer",
  VerifToken.isStudent,
  validator.UpdateStudentValidationYear,
  StudentController.UpdateAnneeUniv
);

module.exports = router;
