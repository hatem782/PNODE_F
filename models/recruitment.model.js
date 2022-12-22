const mongoose = require("mongoose");

const RecruitmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  type: {
    type: String,
    enum: ["Temporary", "Expert"],
    required: true,
  },
  state: {
    type: String,
    enum: ["Rejected", "Accepted", "In progress"],
    required: true,
    default: "In progress",
  },
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Recruitment ", RecruitmentSchema);
