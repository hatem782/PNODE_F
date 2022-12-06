const express = require("express");
const router = express.Router();
const StudentRoutes = require("./student.routes");

router.use("/student", StudentRoutes);

module.exports = router;
