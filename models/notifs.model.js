const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notifications = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Notification", Notifications);
