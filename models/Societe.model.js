const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocieteModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pays: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Societe", SocieteModel);
