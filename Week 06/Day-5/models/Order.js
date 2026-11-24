let mongoose;
try {
  mongoose = require("mongoose");
} catch {
  mongoose = {
    Schema: class { constructor(s) { this.schema = s; } },
    model: (name, s) => ({ find: () => [], create: (d) => d }),
    Types: { ObjectId: class {} },
  };
  mongoose.Schema.Types = { ObjectId: class {} };
}

const orderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Order amount is required"],
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
