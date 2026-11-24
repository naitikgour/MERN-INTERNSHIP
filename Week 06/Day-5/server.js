require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/relationships_db";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected Successfully 🚀"))
  .catch((err) => console.log("MongoDB Connection Error:", err.message));

app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

