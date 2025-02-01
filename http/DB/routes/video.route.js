const express = require("express");
const router = express.Router();

const videoController = require("../controllers/video.controller");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloud");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos",
    resource_type: "video", // Important for video uploads
  },
});
const upload = multer({ storage });

router
  .route("/video-upload")
  .post(upload.single("videoUrl"), videoController.uploadVideo);
router.route("/").get(videoController.getVideos);

module.exports = router;
