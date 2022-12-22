const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defimg =
  "https://res.cloudinary.com/hatem/image/upload/v1665754561/weshield/llkdvocybapq0wajqh19.png";
const TeacherModel = new Schema(
  {},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", TeacherModel);
