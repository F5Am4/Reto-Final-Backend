const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 10,
    max: 50,
  },
  image: {
    type: String,
    required: true,
    width: 80,
    height: 80,
    default: "",
  },
  body: {
    type: String,
    required: true,
    min: 10,
    max: 200,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  create_at: {
    type: Date,
    default: new Date(),
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("post", postsSchema);
