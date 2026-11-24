const express = require("express");
const router = express.Router();
const { createUser, createOrder, getOrders } = require("../controllers/orderController");

router.post("/user", createUser);
router.post("/order", createOrder);
router.get("/orders", getOrders);

module.exports = router;

