const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const VerifToken = require("../middlewares/VerifToken");
const validator = require("../validations/usersValidations");
const Authentification = require("../controllers/Authentification.controller");

// ################ Auth ################
router.post("/login", validator.LoginUserValidation, Authentification.Login);
// ################## refresh token API
router.post("/refreshtoken", Authentification.RefreshToken);
// ################## get user by token API
router.get(
  "/get_user_by_token",
  VerifToken.isUser,
  Authentification.GetUserByToken
);

// ################ Updates ################
router.put("/change_pass", VerifToken.isUser, AllUsers.ChangePassword);
router.put("/change_mail", VerifToken.isUser, AllUsers.ChangeEmail);
router.put("/forget_pass", AllUsers.ForgotPassword);

// ################ COMMON ################
router.put(
  "/update_general",
  validator.validationGeneralUpdate,
  VerifToken.isUser,
  AllUsers.UpdateGeneralInfos
);
router.put("/profile_img", VerifToken.isUser, AllUsers.UploadProfileImg);
router.put("/pub_priv", VerifToken.isUser, AllUsers.pub_priv_profile);

// ################ ONLY BY ADMIN ################
router.get("/getAll", VerifToken.isAdmin, AllUsers.GetAllUsersByRole);
router.delete("/delete/:_id", VerifToken.isAdmin, AllUsers.DeleteUser);

module.exports = router;
f;
