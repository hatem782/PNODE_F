const express = require("express");
const router = express.Router();
const StudentRoutes = require("./student.routes");
const TeacherRoutes = require("./teacher.routes");
const EventRoutes = require("./event.routes");
const ParticipationRoutes = require("./participation.routes");

router.use("/student", StudentRoutes);
router.use("/teacher", TeacherRoutes);
router.use("/event", EventRoutes);
router.use("/participation", ParticipationRoutes);

module.exports = router;
