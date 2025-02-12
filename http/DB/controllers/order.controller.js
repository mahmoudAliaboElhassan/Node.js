const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const Order = require("../models/order.model");

const addOrder = asyncWrapper(async (req, res, next) => {
  const { totalPrice, quantity } = req.body;
  const order = new Order({ totalPrice, quantity });
  await order.save();
  res
    .status(201)
    .json({ message: "created", order, status: httpStatusText.SUCESS });
});
const getAllOrders = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find({});
  res.json({ status: httpStatusText.SUCESS, orders });
});

const updateOrderStatus = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    const error = appError.create(
      "status is required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  const order = await Order.findByIdAndUpdate(id, { status: status });
  res.json({
    message: "Status Updated Successfully",
    status: httpStatusText.SUCESS,
    order,
  });
});

module.exports = { addOrder, getAllOrders, updateOrderStatus };
