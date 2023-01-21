const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const eventValidations = require("../validations/eventValidations");

router.post(
  "/create",
  eventValidations.createEventValidation,
  EventController.CreateEvent
);
router.put(
  "/update/:_id",
  eventValidations.createEventValidation,
  EventController.UpdateEvent
);
router.delete("/delete/:_id", EventController.DeleteEvent);
router.get("/getAll", EventController.GetAllEvents);

module.exports = router;
