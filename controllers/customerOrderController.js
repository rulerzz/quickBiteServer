const CustomerOrder = require("../models/customerOrderModel");
const mongoose = require("mongoose");

exports.getOrders = async (req, res) => {
  try {
    let orders = await CustomerOrder.find({
      _id: req.params.id
    }).sort({ palced_time: "desc" });

    res.status(200).json({
      status: "Success",
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.createOrder = async (req, res) => {
  try {
    let order = await CustomerOrder.create({
      orderType: req.body.orderType,
      status: req.body.status,
      price: req.body.price,
      user: mongoose.Types.ObjectId(req.body.user),
      items: req.body.items,
      placed_time: req.body.placed_time,
      address: req.body.address,
      userId : req.body.userId
    });
    res.status(201).json({
      status: "Success",
      message: "Order added to DB",
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      err,
    });
  }
};
