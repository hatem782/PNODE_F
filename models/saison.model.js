const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Saison = new Schema(
  {
    title: {
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
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Saison", Saison);
