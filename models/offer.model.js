const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerModel = new Schema(
  {
    offerName: {
      type: String,
      required: true,
    },

    offerType: {
      type: String,
      enum: ["Conseil", "Offre", "Opportunité", "Offre d'emploi"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: String,

      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("offer", offerModel);
