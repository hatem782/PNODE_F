const express = require("express");
const router = express.Router();
const CvController = require("../controllers/cv.controller");
const VerifToken = require("../middlewares/VerifToken");

router.post("/create", VerifToken.isUser, CvController.CreateCv);
router.get("/getall", CvController.GetAllCvs);
// router.put(
//   "/update/:_id",
//   VerifToken.isStudent,
//   CvController.CreateProject
// );

module.exports = router;
