const mongoose = require("mongoose");

const customerOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
    },
    orderType: {
      type: String,
      default: "Take Home",
      enum: ["Dine In", "Take Home", "Delivery","Room"],
      required: true,
    },
    address: String,
    placed_time: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Billed", "Closed", "Rejected"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerOrder", customerOrderSchema);
