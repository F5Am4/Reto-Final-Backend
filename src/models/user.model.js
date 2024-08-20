const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  profilePic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: RegExp("/.*@.*..*/"),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  create_At: {
    type: Date,
    default: new Date(),
  },
  update_At: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
