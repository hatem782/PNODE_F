const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventModel = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["JPO", "journéé d'integration ", "formation"],
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
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Event", EventModel);
