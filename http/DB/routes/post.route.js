const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.route("/").post(postController.addPost);
module.exports = router;
