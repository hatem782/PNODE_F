const { number, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectModel = new Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    encadrants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    technologies: [
      {
        type: String,

      }
    ],

    societe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Socite",
    },
    type: {
      type: String,
      enum: ["PFA", "PFE", "Stage"],
      // default: "PFA",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    nbr_students_max: {
      type: Number,
      //  default: 2,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },
    isValidatedByReponsable: {
      type: Boolean,
    },
    note: {
      type: Number,
    },
    mention: {
      type: String,
      default: "Bien",
      enum: [
        "Ajourné",       //En-dessous de 10/20
        "Passable",      //Entre 10/20 et 12/20
        "Assez bien",   //Entre 12/20 et 14/20
        "Bien",        //Entre 14/20 et 16/20*
        "Trés bien",   //Entre 16/20 et 18/20*
        "Excellent",   //18/20 et plus* 
      ],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Project", ProjectModel);
