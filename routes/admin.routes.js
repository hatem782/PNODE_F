const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const adminController = require("../controllers/admin.controlle");
const VerifToken = require("../middlewares/VerifToken");
const validator = require("../validations/usersValidations");

// ################ ONLY BY SUPER ADMIN ################

router.post(
  "/create",
  VerifToken.isSuperadmin,
  validator.createAdminValidation,
  AllUsers.CreateUser
);

router.put(
  "/update_permissions/:_id",
  VerifToken.isSuperadmin,
  validator.AdminPermissionsValidation,
  adminController.UpdateAdminPermessions
);
router.get("/getAll", VerifToken.isSuperadmin, adminController.GetAllAccounts);

module.exports = router;
