const express = require("express");
const router = express.Router();
const StudentRoutes = require("./student.routes");
const TeacherRoutes = require("./teacher.routes");
const AllUsers = require("./AllUsers.routes");
const EventRoutes = require("./event.routes");
const ParticipationRoutes = require("./participation.routes");
const ProjectRoutes = require("./project.routes");
const TechnologieRoutes = require("./technologie.routes");
const EmployementRoutes = require("./employment.routes");

router.use("/student", StudentRoutes);
router.use("/teacher", TeacherRoutes);
router.use("/user", AllUsers);
router.use("/event", EventRoutes);
router.use("/participation", ParticipationRoutes);
router.use("/project", ProjectRoutes);
router.use("/technologie", TechnologieRoutes);
router.use("/employement", EmployementRoutes);

module.exports = router;
