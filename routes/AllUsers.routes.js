const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const isUser = require("../middlewares/isUser");

router.put("/profile_img", isUser, AllUsers.UploadProfileImg);
router.put("/change_pass", isUser, AllUsers.ChangePassword);
router.put("/change_mail", isUser, AllUsers.ChangeEmail);
router.put("/forget_pass", AllUsers.ForgotPassword);

module.exports = router;
