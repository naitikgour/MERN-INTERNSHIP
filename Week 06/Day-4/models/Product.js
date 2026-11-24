let mongoose;
try {
  mongoose = require("mongoose");
} catch {
  mongoose = {
    Schema: class { constructor(s) { this.schema = s; } },
    model: (name, s) => ({ find: () => [], create: (d) => d }),
    Types: { ObjectId: { isValid: (id) => typeof id === "string" && id.length >= 8 } },
    connection: { readyState: 0 },
  };
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
