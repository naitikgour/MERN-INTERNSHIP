require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/product_db";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully 🚀"))
  .catch((err) => console.log("MongoDB Connection Error:", err.message));

app.use("/api/products", productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

