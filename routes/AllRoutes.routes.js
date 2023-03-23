const express = require("express");
const router = express.Router();
const StudentRoutes = require("./student.routes");
const TeacherRoutes = require("./teacher.routes");
const AdminRoutes = require("./admin.routes");
const AllUsers = require("./AllUsers.routes");
const EventRoutes = require("./event.routes");
const ParticipationRoutes = require("./participation.routes");
const ProjectRoutes = require("./project.routes");
const TechnologieRoutes = require("./technologie.routes");
const CvRoutes = require("./Cv.routes");
const RecruitmentRoutes = require("./Recruitment.routes");
const EmployementRoutes = require("./employment.routes");
const SaisonRoutes = require("./Saison.routes");
const OfferRoutes = require("./offer.routes");

router.use("/student", StudentRoutes);
router.use("/teacher", TeacherRoutes);
router.use("/user", AllUsers);
router.use("/event", EventRoutes);
router.use("/participation", ParticipationRoutes);
router.use("/project", ProjectRoutes);
router.use("/technologie", TechnologieRoutes);
router.use("/cv", CvRoutes);
router.use("/admin", AdminRoutes);
router.use("/employement", EmployementRoutes);
router.use("/saison", SaisonRoutes);

router.use("/recruitment", RecruitmentRoutes);
router.use("/offer", OfferRoutes);

module.exports = router;
