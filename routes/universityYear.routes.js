const express = require("express");
const router = express.Router();
const universityYearController = require("../controllers/universityYear.controller");

router.post("/create", universityYearController.create);

module.exports = router;
