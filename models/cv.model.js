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
      required: true,
    },
    localisation: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
      required: true,
    },
    style: {
      type: Number,
      required: false,
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
