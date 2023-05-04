const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defimg =
  "https://res.cloudinary.com/hatem/image/upload/v1665754561/weshield/llkdvocybapq0wajqh19.png";

const UserModel = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    profilImage: { type: String, default: defimg },
    sex: {
      type: String,
      required: true,
      default: "MEN",
      enum: ["MEN", "WOMEN"],
    },
    role: {
      type: String,
      default: "STUDENT",
      enum: [
        "STUDENT",
        "ALUMINIE",
        "TEACHER",
        "RESPONSIBLE",
        "SUPERADMIN",
        "ADMIN",
      ],
    },
    // ################ STUDENT FIELDS #######################
    classe: { type: String, required: false },
    niveau: { type: String, required: false },
    numero_classe: { type: Number, required: false },
    promotion: { type: String, required: false },
    isPublic: { type: Boolean, default: true },
    isUpdated: { type: Boolean, default: false },
    // ################ ALUMINIE FIELDS ######################
    diplome: { type: String, required: false, default: "None" },
    diplomeDate: { type: Date, required: false, default: null },
    // ################# TEACHER FIELDS ######################
    course: { type: [String], required: true },
    // ################### ADMIN FIELDS ######################
    permessions: {
      type: [String],
      required: true,
      enum: [
        "student",
        "teacher",
        "user",
        "event",
        "participation",
        "project",
        "technologie",
        "cv",
        "saison",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserModel);
