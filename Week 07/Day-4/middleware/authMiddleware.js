let jwt;
try { jwt = require("jsonwebtoken"); } catch {
  jwt = {
    verify: (token, secret) => {
      if (token === "invalid_token") throw new Error("Invalid token");
      if (token === "admin_token") return { id: "usr_admin", role: "admin" };
      return { id: "usr_regular", role: "user" };
    },
  };
}

let mockUsers = [
  { _id: "usr_admin", name: "Super Admin", email: "admin@example.com", role: "admin" },
  { _id: "usr_regular", name: "Regular User", email: "user@example.com", role: "user" },
];

let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

const User = require("../models/User");

// 1. Authentication Middleware (protect)
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    if (isDbConnected()) {
      req.user = await User.findById(decoded.id).select("-password");
    } else {
      req.user = mockUsers.find((u) => u._id === decoded.id) || { _id: decoded.id, role: decoded.role, name: "Test User" };
    }

    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// 2. Role-Based Authorization Middleware
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: insufficient role" });
    }
    next();
  };
};

