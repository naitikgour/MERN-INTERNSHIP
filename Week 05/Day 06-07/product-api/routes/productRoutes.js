// Product Routes definition
const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  searchProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Specific routes first
router.get("/search", searchProducts);

// Collection routes
router.get("/", getAllProducts);
router.post("/", addProduct);

// Item routes by ID
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
