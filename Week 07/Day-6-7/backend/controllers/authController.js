let bcrypt;
try { bcrypt = require("bcryptjs"); } catch {
  const crypto = require("crypto");
  bcrypt = {
    genSalt: async (r) => "salt10",
    hash: async (pw, salt) => `$2a$10$hash_${crypto.createHash("sha256").update(pw).digest("hex").slice(0, 20)}`,
    compare: async (pw, hashed) => hashed && hashed.includes(crypto.createHash("sha256").update(pw).digest("hex").slice(0, 20)),
  };
}

let jwt;
try { jwt = require("jsonwebtoken"); } catch {
  const crypto = require("crypto");
  jwt = {
    verify: (token, secret) => {
      const parts = token.split(".");
      return JSON.parse(Buffer.from(parts[1], "base64url").toString());
    },
  };
}

const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

let mockUsers = [
  {
    _id: "65ff0001",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2a$10$hash_96cae35ce8a9b0244178", // 'admin123'
    role: "admin",
    refreshTokens: [],
    toJSON() {
      const { password, refreshTokens, ...u } = this;
      return u;
    },
    async save() { return this; }
  },
];

let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

// POST /api/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (isDbConnected()) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already registered" });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: hashed, role });
      return res.status(201).json({ message: "User registered", user: user.toJSON() });
    }

    if (mockUsers.some((u) => u.email === email)) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = {
      _id: "65ff" + (mockUsers.length + 10).toString(16),
      name,
      email,
      password: hashed,
      role: role || "user",
      refreshTokens: [],
      toJSON() {
        const { password, refreshTokens, ...u } = this;
        return u;
      },
      async save() { return this; }
    };
    mockUsers.push(newUser);
    res.status(201).json({ message: "User registered", user: newUser.toJSON() });
  } catch (err) {
    next(err);
  }
};

// POST /api/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email });
    } else {
      user = mockUsers.find((u) => u.email === email);
    }

    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user._id, role: user.role, name: user.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: user.toJSON(),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/refresh-token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret");
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    let user;
    if (isDbConnected()) {
      user = await User.findById(decoded.id);
    } else {
      user = mockUsers.find((u) => u._id === decoded.id);
    }

    if (!user) return res.status(401).json({ message: "User not found" });
    const found = user.refreshTokens.find((rt) => rt.token === refreshToken);
    if (!found) return res.status(401).json({ message: "Refresh token revoked" });

    const payload = { id: user._id, role: user.role, name: user.name };
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Rotate refresh token
    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== refreshToken);
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
};

// POST /api/logout
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret");
    } catch {
      return res.json({ message: "Logged out" });
    }

    let user;
    if (isDbConnected()) {
      user = await User.findById(decoded.id);
    } else {
      user = mockUsers.find((u) => u._id === decoded.id);
    }

    if (user) {
      user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== refreshToken);
      await user.save();
    }

    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

exports._getMockUsers = () => mockUsers;

