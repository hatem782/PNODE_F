const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipationModel = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    confirmation: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      resuired: false,
      default:
        "Vous êtes invité à cet événement,prière de confirmer votre présence.",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Participation", ParticipationModel);
