const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventModel = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDateDebut: {
      type: Date,
      required: true,
    },
    eventDateFin: {
      type: Date,
      required: false,
    },
    eventType: {
      type: String,
      enum: ["JPO", "Journée d'integration", "Formation"],
      default: "JPO",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "isamm",
    },
    duration: {
      type: String,
      required: false,
    },
    bgImage: {
      type: String,
      required: false,
      default: "",
    },
    organizedBy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Event", EventModel);
