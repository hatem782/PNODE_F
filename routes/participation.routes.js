const express = require("express");
const router = express.Router();
const ParticipationController = require("../controllers/participation.controller");
const verifToken = require("../middlewares/VerifToken");
const eventValidations = require("../validations/eventValidations");

// student
router.post(
  "/create/:_idEvent",
  verifToken.isUser,
  eventValidations.validationParticipationCreate,
  ParticipationController.CreateParticipation
);
// student aluminie
router.put(
  "/updateConfirmation/:_idEvent",
  verifToken.isUser,
  ParticipationController.UpdateConfirmation
);
//Admin
router.post(
  "/createInvitation/:_idEvent/:_idStudent",
  ParticipationController.CreateInvitation
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
