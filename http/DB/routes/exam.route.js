const express = require("express");
const router = express.Router();

const examController = require("../controllers/exam.controller");
const verifyToken = require("../middlewares/verifyToken");

router
  .route("/")
  .get(examController.getExams)
  .post(verifyToken, examController.addExam);
router.route("/:id").post(examController.answerExam);

module.exports = router;
