const express = require("express");
const router = express.Router();
const TechnologieController = require("../controllers/Technologie.controller");

router.post("/create", TechnologieController.CreateTechnologie);
router.get("/getAll", TechnologieController.GetAllTechnologies);

module.exports = router;
