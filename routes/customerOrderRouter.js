const express = require('express');
const {
  getOrders,
  createOrder
} = require("../controllers/customerOrderController");

const router = express.Router();

router.route("/orderinfo/:id").get(getOrders);
router.route("/createorder").post(createOrder)
module.exports = router;
