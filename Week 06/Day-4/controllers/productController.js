const Product = require("../models/Product");

let mongoose;
try {
  mongoose = require("mongoose");
} catch {
  mongoose = {
    connection: { readyState: 0 },
    Types: { ObjectId: { isValid: (id) => typeof id === "string" && id.length >= 8 } },
  };
}

let mockProducts = [
  { _id: "65fa0001", name: "iPhone 15 Pro", price: 1200, category: "Electronics", createdAt: new Date("2026-01-01") },
  { _id: "65fa0002", name: "MacBook Pro M3", price: 2000, category: "Electronics", createdAt: new Date("2026-01-05") },
  { _id: "65fa0003", name: "Wireless Earbuds", price: 150, category: "Electronics", createdAt: new Date("2026-01-10") },
  { _id: "65fa0004", name: "Organic Honey 500g", price: 25, category: "Grocery", createdAt: new Date("2026-01-12") },
  { _id: "65fa0005", name: "Premium Almonds 1kg", price: 40, category: "Grocery", createdAt: new Date("2026-01-15") },
  { _id: "65fa0006", name: "Ergonomic Desk Chair", price: 350, category: "Furniture", createdAt: new Date("2026-01-18") },
  { _id: "65fa0007", name: "Standing Desk Electric", price: 600, category: "Furniture", createdAt: new Date("2026-01-20") },
  { _id: "65fa0008", name: "Pro Gaming Mouse", price: 80, category: "Electronics", createdAt: new Date("2026-01-22") },
];

const isDbConnected = () => mongoose.connection.readyState === 1;

// 1. Search, Filter, Sort & Pagination Route
exports.searchAndFilterProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, page = 1, limit = 10, sort = "price" } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));

    if (isDbConnected()) {
      const filters = {};
      if (name) filters.name = { $regex: name, $options: "i" };
      if (category) filters.category = category;
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gt = Number(minPrice);
        if (maxPrice) filters.price.$lt = Number(maxPrice);
      }

      const sortOrder = sort.startsWith("-") ? -1 : 1;
      const sortField = sort.replace(/^-/, "");

      const total = await Product.countDocuments(filters);
      const data = await Product.find(filters)
        .sort({ [sortField]: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({ total, page: pageNum, limit: limitNum, data });
    }

    let filtered = [...mockProducts];

    if (name) {
      const reg = new RegExp(name, "i");
      filtered = filtered.filter((p) => reg.test(p.name));
    }
    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (minPrice) {
      filtered = filtered.filter((p) => p.price > Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price < Number(maxPrice));
    }

    const sortOrder = sort.startsWith("-") ? -1 : 1;
    const sortField = sort.replace(/^-/, "");
    filtered.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1) * sortOrder);

    const total = filtered.length;
    const start = (pageNum - 1) * limitNum;
    const data = filtered.slice(start, start + limitNum);

    res.json({ total, page: pageNum, limit: limitNum, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({ error: "Name, price and category are required" });
    }

    if (isDbConnected()) {
      const product = await Product.create(req.body);
      return res.status(201).json({ message: "Product created", product });
    }

    const newProd = {
      _id: "65fa" + (mockProducts.length + 10).toString(16),
      name,
      price: Number(price),
      category,
      createdAt: new Date(),
    };
    mockProducts.push(newProd);
    res.status(201).json({ message: "Product created", product: newProd });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected() && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    if (isDbConnected()) {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.json({ message: "Product updated", product });
    }

    const prod = mockProducts.find((p) => p._id === id);
    if (!prod) return res.status(404).json({ error: "Product not found" });
    Object.assign(prod, req.body);
    res.json({ message: "Product updated", product: prod });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected() && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    if (isDbConnected()) {
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.json({ message: "Product deleted" });
    }

    const idx = mockProducts.findIndex((p) => p._id === id);
    if (idx === -1) return res.status(404).json({ error: "Product not found" });
    mockProducts.splice(idx, 1);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
