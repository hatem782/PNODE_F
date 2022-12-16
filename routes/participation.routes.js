const express = require("express");
const router = express.Router();
const ParticipationController = require("../controllers/participation.controller");
const isStudent = require("../middlewares/isStudent.js");
router.post(
  "/create/:_idEvent",
  isStudent,
  ParticipationController.CreateParticipation
);
router.put(
  "/update/:_idEvent/:_idStudent",
  ParticipationController.UpdateParticipation
);
router.get(
  "/getAllConfirmed",
  ParticipationController.GetAllParticipationsConfirmed
);

module.exports = router;
