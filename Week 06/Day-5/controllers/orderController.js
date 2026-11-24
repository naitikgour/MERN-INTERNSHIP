const User = require("../models/User");
const Order = require("../models/Order");

let mongoose;
try {
  mongoose = require("mongoose");
} catch {
  mongoose = { connection: { readyState: 0 } };
}

let mockUsers = [
  { _id: "65fb0001", name: "Rahul Sharma", email: "rahul@example.com", role: "Customer", age: 24 },
  { _id: "65fb0002", name: "Pooja Patel", email: "pooja@example.com", role: "Admin", age: 30 },
];

let mockOrders = [
  { _id: "65fc0001", productName: "Laptop ThinkPad", amount: 65000, user: "65fb0001" },
  { _id: "65fc0002", productName: "Wireless Keyboard", amount: 2500, user: "65fb0001" },
  { _id: "65fc0003", productName: "4K Monitor 27-inch", amount: 28000, user: "65fb0002" },
];

const isDbConnected = () => mongoose.connection.readyState === 1;

exports.createUser = async (req, res) => {
  try {
    const { name, email, role, age, password, mobile } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    if (role && !["Admin", "Customer", "Seller"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Must be Admin, Customer, or Seller" });
    }

    if (isDbConnected()) {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    }

    const newUser = {
      _id: "65fb" + (mockUsers.length + 10).toString(16),
      name,
      email,
      role: role || "Customer",
      age: age ? Number(age) : 25,
    };
    mockUsers.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { productName, amount, user } = req.body;
    if (!productName || !amount || !user) {
      return res.status(400).json({ error: "Product name, amount, and user ID are required" });
    }

    if (isDbConnected()) {
      const order = await Order.create(req.body);
      return res.status(201).json(order);
    }

    const newOrder = {
      _id: "65fc" + (mockOrders.length + 10).toString(16),
      productName,
      amount: Number(amount),
      user,
    };
    mockOrders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    if (isDbConnected()) {
      const data = await Order.find().populate("user", "name email role");
      return res.json(data);
    }

    const populated = mockOrders.map((ord) => {
      const foundUser = mockUsers.find((u) => u._id === ord.user);
      return {
        _id: ord._id,
        productName: ord.productName,
        amount: ord.amount,
        user: foundUser ? { _id: foundUser._id, name: foundUser.name, email: foundUser.email, role: foundUser.role } : null,
      };
    });
    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
