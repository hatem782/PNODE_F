const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechnologieModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Technologie", TechnologieModel);
