const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student.controller");
const isStudent = require("../middlewares/isStudent");

// // anyone
// router.post("/register_aluminie", StudentController.RegisterAluminie); // te5dem
// router.get("/login", StudentController.StudentLogin); // te5dem

// // Student or aluminie
// router.put("/update", isStudent, StudentController.UpdateStudent); // te5dem
// router.put("/profile_cv", isStudent, StudentController.UploadCV); // te5dem

// router.put("/pub_priv", isStudent, StudentController.pub_priv_profile); // te5dem

// // Admin or Manager
// router.post("/create", StudentController.CreateStudent); // te5dem
// router.get("/getAll", StudentController.GetAllStudents); // te5dem
// router.get("/getOne/:_id", StudentController.GetOneStudent); // te5dem
// router.put("/change_promotion/:_id", StudentController.UpdatePromotion); // te5dem
// router.put("/become_deplomated/:_id", StudentController.BecomeDeplomated); // te5dem
// router.put("/block_unblock/:_id", StudentController.block_unblock); // te5dem
// router.delete("/delete/:_id", StudentController.DeleteStudent); // te5dem

module.exports = router;
