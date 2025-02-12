const { mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
