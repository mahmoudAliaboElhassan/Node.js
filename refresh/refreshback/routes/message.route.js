const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");

router.post("/", messageController.sendVerificationCode);
router.post("/verify", messageController.verifyCode);

module.exports = router;
