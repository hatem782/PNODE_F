const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./mongodb/mongo.connect");

const StudentRoutes = require("./routes/student.routes");
const TeacherRoutes = require("./routes/teacher.routes")
const EventRoutes = require("./routes/event.routes")
const ParticipationRoutes = require("./routes/participation.routes")


const corstAllowAll = {
  credentials: true,
  origin: true,
  "Access-Control-Allow-Origin": "*",
};

dotenv.config();
app.use(cors(corstAllowAll));
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.listen(process.env.PORT || 8080, () => {
  console.log(process.env.PORT);
  connectDB();
});

app.get("/", (req, res) => {
  const resu = "<h1>Welcome to ISAMM NODE JS :  " + process.env.PORT + "</h1>";
  res.send(resu);
});

app.get("/test", (req, res) => {
  const resu = "<h1>this is just a test</h1>";
  res.send(resu);
});

// all routes here
app.use("/student", StudentRoutes);
app.use("/teacher", TeacherRoutes);
app.use("/event", EventRoutes);
app.use("/participation",  ParticipationRoutes)



