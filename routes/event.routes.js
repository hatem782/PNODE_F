const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const eventValidations = require("../validations/eventValidations");
const verifToken = require("../middlewares/VerifToken");

router.post(
  "/create",
  verifToken.isSuperadmin,
  eventValidations.createEventValidation,
  EventController.CreateEvent
);
router.put(
  "/update/:_id",
  verifToken.isSuperadmin,
  eventValidations.createEventValidation,
  EventController.UpdateEvent
);
router.delete(
  "/delete/:_id",
  verifToken.isSuperadmin,
  EventController.DeleteEvent
);
router.get("/getAll", verifToken.isSuperadmin, EventController.GetAllEvents);
router.get(
  "/getOne/:_id",
  verifToken.isSuperadmin,
  EventController.GetOneEvent
);

module.exports = router;
