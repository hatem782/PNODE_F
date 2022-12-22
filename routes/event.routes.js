const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const otherValidations = require("../validations/otherValidations");

router.post(
  "/create",
  otherValidations.createEventValidation,
  EventController.CreateEvent
);
router.put("/update/:_id", EventController.UpdateEvent);
router.delete("/delete/:_id", EventController.DeleteEvent);
router.get("/getAll", EventController.GetAllEvents);

module.exports = router;
