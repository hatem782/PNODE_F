const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defimg =
  "https://res.cloudinary.com/hatem/image/upload/v1665754561/weshield/llkdvocybapq0wajqh19.png";

const StudentModel = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    birthDate: { type: Date, required: false },
    classe: { type: String, required: false },
    niveau: { type: String, required: false },
    sex: { type: String, required: true, default: "Men" },
    profilImage: { type: String, default: defimg },
    cv: { type: String, required: false },
    isAluminie: { type: Boolean, default: false },
    isDeplomated: { type: Boolean, default: false },
    deplome: { type: String, default: false },
    promotion: { type: String, required: false },
    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentModel);
