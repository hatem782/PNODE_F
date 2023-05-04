const { number, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectModel = new Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    encadrant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    technologies: [
      {
        type: String,
      },
    ],

    societe: {
      type: String,
      required: false,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Socite",
    },

    type: {
      type: String,
      enum: ["PFA", "PFE", "STAGE"],
      default: "Stage",
      required: true,
    },

    promotion: { type: String, required: false },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },
    project_life_cycle: {
      type: String,
      enum: [
        "Pending_Teacher",
        "Pending_Validation",
        "Validated",
        "Accepted_By_Resp",
        "Pending_Accept_By_Resp",
      ],
      default: "Pending_Teacher",
    },

    note: {
      type: Number,
      default: 0,
    },

    mention: {
      type: String,
      enum: [
        "Ajourné", //En-dessous de 10/20
        "Passable", //Entre 10/20 et 12/20
        "Assez bien", //Entre 12/20 et 14/20
        "Bien", //Entre 14/20 et 16/20*
        "Trés bien", //Entre 16/20 et 18/20*
        "Excellent", //18/20 et plus*
      ],
      default: "Ajourné",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Project", ProjectModel);
