const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Notes = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "notes",
  }
);

module.exports = mongoose.model("Notes", Notes);
