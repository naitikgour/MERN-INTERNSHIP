const express = require("express");
const router = express.Router();
const {
  searchAndFilterProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Advanced Query Endpoints
router.get("/search", searchAndFilterProducts);
router.get("/filter", searchAndFilterProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

