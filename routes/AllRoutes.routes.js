const express = require("express");
const router = express.Router();
const StudentRoutes = require("./student.routes");
const TeacherRoutes = require("./teacher.routes");
const EventRoutes = require("./event.routes");
const ParticipationRoutes = require("./participation.routes");
const ProjectRoutes = require("./project.route");
const TechnologieRoutes = require("./technologie.route");

router.use("/student", StudentRoutes);
router.use("/teacher", TeacherRoutes);
router.use("/event", EventRoutes);
router.use("/participation", ParticipationRoutes);
router.use("/project", ProjectRoutes);
router.use("/technologie", TechnologieRoutes);

module.exports = router;
