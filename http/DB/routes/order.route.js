const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const verifyAdmin = require("../middlewares/verifyAdmin");

router
  .route("/")
  .post(orderController.addOrder)
  .get(orderController.getAllOrders);

router.route("/:id").put(verifyAdmin, orderController.updateOrderStatus);
module.exports = router;
