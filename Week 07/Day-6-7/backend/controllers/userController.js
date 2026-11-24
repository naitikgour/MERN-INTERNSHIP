const User = require("../models/User");
const { _getMockUsers } = require("./authController");

let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

// GET /api/profile
exports.getProfile = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const user = await User.findById(req.user.id).select("-password -refreshTokens");
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json({ profile: user });
    }

    const mockUsers = _getMockUsers();
    const user = mockUsers.find((u) => u._id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ profile: user.toJSON() });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/users
exports.getAllUsers = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const users = await User.find().select("-password -refreshTokens");
      return res.json({ users });
    }

    const mockUsers = _getMockUsers();
    res.json({ users: mockUsers.map((u) => u.toJSON()) });
  } catch (err) {
    next(err);
  }
};

// PUT /api/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.password) {
      let bcrypt;
      try { bcrypt = require("bcryptjs"); } catch {
        const crypto = require("crypto");
        bcrypt = { hash: async (pw) => `$2a$10$hash_${crypto.createHash("sha256").update(pw).digest("hex").slice(0, 20)}` };
      }
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    if (isDbConnected()) {
      const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password -refreshTokens");
      return res.json({ profile: user });
    }

    const mockUsers = _getMockUsers();
    const user = mockUsers.find((u) => u._id === req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (updates.name) user.name = updates.name;
    if (updates.password) user.password = updates.password;
    res.json({ profile: user.toJSON() });
  } catch (err) {
    next(err);
  }
};

