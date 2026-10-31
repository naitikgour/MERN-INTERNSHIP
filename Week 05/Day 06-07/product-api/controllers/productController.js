// Product Controller handling all business logic
let products = require("../data/products");

// GET ALL PRODUCTS
exports.getAllProducts = (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
};

// GET PRODUCT BY ID
exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    success: true,
    data: product
  });
};

// SEARCH PRODUCTS BY NAME (from curriculum notes p. 9)
exports.searchProducts = (req, res) => {
  const query = (req.query.name || "").trim().toLowerCase();
  if (!query) {
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  res.status(200).json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

// ADD PRODUCT
exports.addProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined || price === null || price === "") {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ message: "Price must be positive" });
  }

  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    name: name.trim(),
    price: numericPrice
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    data: newProduct
  });
};

// UPDATE PRODUCT
exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price } = req.body;

  if (name !== undefined && name !== null) {
    product.name = name.trim();
  }

  if (price !== undefined && price !== null && price !== "") {
    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }
    product.price = numericPrice;
  }

  res.status(200).json({
    message: "Product updated successfully",
    data: product
  });
};

// DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  res.status(200).json({
    message: "Product deleted successfully",
    deleted: deletedProduct
  });
};
