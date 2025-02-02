const asyncWrapper = require("../middlewares/asyncWrapper");
const Post = require("../models/post.model");
const jwt = require("jsonwebtoken");

const addPost = asyncWrapper(async (req, res, next) => {
  const { title, description } = req.body;
  const token = req.cookies.JwtToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { id } = decoded;
  const post = new Post({ title, description, user: id });
  await post.save();
  // Ensure `populate()` is awaited
  await post.populate("user");

  res.json({ post });
});
module.exports = { addPost };
