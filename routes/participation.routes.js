const express = require("express");
const router = express.Router();
const ParticipationController = require("../controllers/participation.controller");
const isStudent = require("../middlewares/isStudent.js");
const isAluminie = require("../middlewares/isStudent.js");

router.post(
  "/create/:_idEvent",
  isStudent,
  ParticipationController.CreateParticipation
);
router.post(
  "/createInvitation/:_idEvent/:_idStudent",
  ParticipationController.CreateInvitation
);
router.put(
  "/update/:_idEvent",
  isStudent,
  ParticipationController.UpdateParticipation
);
router.put(
  "/updateConfirInvit/:_idEvent",
  isAluminie,
  ParticipationController.UpdateInvitation
);
router.get(
  "/getAllConfirmed/:_idEvent",
  ParticipationController.GetAllParticipationsConfirmed
);
router.get(
  "/getAllConfirmedInvit/:_idEvent",
  ParticipationController.GetAllInvitationConfirmed
);
module.exports = router;
