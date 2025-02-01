const asyncWrapper = require("../middlewares/asyncWrapper");
const Video = require("../models/video.model");

const uploadVideo = asyncWrapper(async (req, res, next) => {
  const { title } = req.body;
  const videoUrl = req.file.path; // Cloudinary URL
  console.log(req.file);

  const newVideo = new Video({ title, videoUrl });
  console.log(newVideo);
  await newVideo.save();

  res.status(201).json({ success: true, video: newVideo });
});

const getVideos = asyncWrapper(async (req, res, next) => {
  const videos = await Video.find({});
  res.json({ videos });
});

module.exports = { uploadVideo, getVideos };
