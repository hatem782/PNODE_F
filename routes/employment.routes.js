const express = require("express");
const router = express.Router();
const employmentController = require("../controllers/employment.controller");


router.post("/create",employmentController.CreateSociete);
router.get("/getAll", employmentController.getAllSociete);
router.post("/startPosition", employmentController.startPositionInSociete);

module.exports = router;
