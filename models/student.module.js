const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defimg =
  "https://res.cloudinary.com/hatem/image/upload/v1665754561/weshield/llkdvocybapq0wajqh19.png";

const StudentModel = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    birthDate: { type: Date, required: false },
    sex: { type: String, required: true, default: "MEN" },
    profilImage: { type: String, default: defimg },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentModel);
