const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionModel = new Schema(
  {
    designation: {
        type: String,
      required: true,
    },
    societe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Societe",
      required: true,
    },
    alumini: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      startDate: {
        type: Date,
      },
  
      endDate: {
        type: Date,
      },

  
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Position", PositionModel);
