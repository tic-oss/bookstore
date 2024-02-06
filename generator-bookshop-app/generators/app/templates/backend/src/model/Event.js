const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Event = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    dateTime: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", Event);
