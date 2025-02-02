const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "post title is required"],
      minlength: [3, "post title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "post description is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "user having post is required is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);
