const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./mongodb/mongo.connect");
const Routes = require("./routes/AllRoutes.routes");

const corstAllowAll = {
  credentials: true,
  origin: true,
  "Access-Control-Allow-Origin": "*",
};

dotenv.config();
app.use(cors(corstAllowAll));
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use("/api", Routes);
