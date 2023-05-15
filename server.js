const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./Database/mongo.connect");
const Routes = require("./routes/AllRoutes.routes");
const Timer = require("./Tasks/Timer");
const mongoose = require("mongoose");
const m2s = require("mongoose-to-swagger");
const bcrypt = require("bcrypt");
const { autoUpdateEveryYear } = require("./functions/updateEveryYear");
const cron = require("node-cron");

const swaggerUi = require("swagger-ui-express");
//const swaggerDocument = require('./Swagger/swagger.json');
const swaggerFile = require("./Swagger/swagger_output.json");
const userModule = require("./models/user.module");

cron.schedule("0 0 31 8 *", async () => {
  try {
    await autoUpdateEveryYear();
    console.log("Function executed at the end of August!");
  } catch (error) {
    console.log("errrrrrrrrrrrrrror");
  }
});

const corstAllowAll = {
  credentials: true,
  origin: true,
  "Access-Control-Allow-Origin": "*",
};

dotenv.config();
app.use(cors(corstAllowAll));
app.options("*", cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 8080, () => {
  console.log(process.env.PORT);
  connectDB();
  Timer.Timer();
});

app.use("/api", Routes);

async function creatSuperAdmin() {
  try {
    const existingUser = await userModule.findOne({
      role: "SUPERADMIN",
    });

    if (!existingUser) {
      const mdp = "58217520";
      const mdpCrypted = await bcrypt.hash(mdp, Number(process.env.SALT));
      const newUser = new userModule({
        userName: "58217520",
        email: "chouroufarah@gmail.com",
        firstName: "farah",
        lastName: "chourou",
        role: "SUPERADMIN",
        password: mdpCrypted,
        birthDate: "1999-10-19",
        phoneNumber: 58217520,
        sex: "MEN",
      });

      await newUser.save();
      console.log("SuperAdmincreated");
    }
  } catch (error) {
    console.error(error);
  }
}

creatSuperAdmin();
