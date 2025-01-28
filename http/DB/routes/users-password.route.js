const express = require("express");
const router = express.Router();
const userPasswordController = require("../controllers/users-password.controller");

router
  .route("/forget-password")
  .get(userPasswordController.getForgetPage)
  .post(userPasswordController.sendForgotPasswordLink);

router
  .route("/password/reset-password/:id/:token")
  .get(userPasswordController.getPasswordResetView)
  .post(userPasswordController.resetPassword);
module.exports = router; // Make sure you're exporting the router
