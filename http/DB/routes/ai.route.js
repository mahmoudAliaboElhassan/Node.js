const express = require("express");
const router = express.Router();

const AIController = require("../controllers/ai.controller");

router.route("/").post(AIController.answerQuestion);
router.route("/img").post(AIController.genImg);

module.exports = router;
