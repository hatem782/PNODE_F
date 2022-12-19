const express = require("express");
const router = express.Router();
const AllUsers = require("../controllers/AllUsers.controller");
const isStudent = require("../middlewares/isStudent");

router.put("/profile_img", isStudent, AllUsers.UploadProfileImg); // te5dem
router.put("/change_pass", isStudent, AllUsers.ChangePassword); // te5dem
router.put("/change_mail", isStudent, AllUsers.ChangeEmail); // te5dem
router.put("/forget_pass", AllUsers.ForgotPassword); // te5dem

module.exports = router;
