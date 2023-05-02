const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CvModel = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
    },
    localisation: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    style: {
      type: Number,
      default: 1,
    },
    experiences: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        emplacement: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    formations: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        emplacement: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    languages: [
      {
        lang: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          required: true,
        },
      },
    ],
    hard_skills: [
      {
        type: String,
        required: true,
      },
    ],
    soft_skills: [
      {
        type: String,
        required: true,
      },
    ],
    hobbys: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cv", CvModel);
