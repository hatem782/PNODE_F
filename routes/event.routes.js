const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");

router.post("/create", EventController.CreateEvent);
router.put("/update/:_id", EventController.UpdateEvent);
router.delete("/delete/:_id", EventController.DeleteEvent);
router.get("/getAll", EventController.GetAllEvents);

module.exports = router;
