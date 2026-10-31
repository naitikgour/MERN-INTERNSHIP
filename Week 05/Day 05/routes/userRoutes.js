// Week 5 - Day 5: User Routes using Express Router
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD endpoints
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

// Task 3: Dynamic parameter endpoint (/api/users/:id/:section)
router.get("/:id/:section", userController.getUserSection);

// Route with multiple parameters (/api/users/:userId/orders/:orderId)
router.get("/:userId/orders/:orderId", userController.getUserOrder);

// Single user by ID
router.get("/:id", userController.getUserById);

module.exports = router;
