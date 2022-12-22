const express = require("express");
const router = express.Router();
const ParticipationController = require("../controllers/participation.controller");
const isStudent = require("../middlewares/VerifToken");
const isAluminie = require("../middlewares/VerifToken");

router.post(
  "/create/:_idEvent",
  isStudent.isUser,
  ParticipationController.CreateParticipation
);
router.post(
  "/createInvitation/:_idEvent/:_idStudent",
  ParticipationController.CreateInvitation
);
router.put(
  "/update/:_idEvent",
  isStudent.isUser,
  ParticipationController.UpdateParticipation
);
router.put(
  "/updateConfirInvit/:_idEvent",
  isAluminie.isUser,
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
