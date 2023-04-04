const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please enter a comment.js text"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  coin: {
    type: mongoose.Schema.ObjectId,
    ref: "Coin",
    required: [true, "Please provide a coin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
