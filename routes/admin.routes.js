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
  "/update_permissions",
  VerifToken.isSuperadmin,
  validator.AdminPermissionsValidation,
  adminController.UpdateAdminPermessions
);

module.exports = router;
