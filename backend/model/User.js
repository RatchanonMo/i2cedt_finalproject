const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "user",
  }
);
module.exports = mongoose.model("User", UserSchema);
