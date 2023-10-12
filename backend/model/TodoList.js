const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TodoSchema = new Schema(
  {
    date: {
      type: String,
    },
    subject: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "todo",
  }
);
module.exports = mongoose.model("Todo", TodoSchema);
