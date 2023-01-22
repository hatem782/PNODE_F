const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const eventValidations = require("../validations/eventValidations");
const verifToken = require("../middlewares/VerifToken");

router.post(
  "/create",
  verifToken.isAdmin,
  eventValidations.createEventValidation,
  EventController.CreateEvent
);
router.put(
  "/update/:_id",
  verifToken.isAdmin,
  eventValidations.createEventValidation,
  EventController.UpdateEvent
);
router.delete("/delete/:_id", verifToken.isAdmin, EventController.DeleteEvent);
router.get("/getAll", verifToken.isAdmin, EventController.GetAllEvents);

module.exports = router;
