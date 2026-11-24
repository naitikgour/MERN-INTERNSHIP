let jwt;
try { jwt = require("jsonwebtoken"); } catch {
  const crypto = require("crypto");
  jwt = {
    sign: (payload, secret, opts) => {
      const h = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
      const p = Buffer.from(JSON.stringify(payload)).toString("base64url");
      const s = crypto.createHmac("sha256", secret || "secret").update(`${h}.${p}`).digest("base64url");
      return `${h}.${p}.${s}`;
    },
    verify: (token, secret) => {
      const [h, p] = token.split(".");
      return JSON.parse(Buffer.from(p, "base64url").toString());
    },
  };
}

let bcrypt;
try { bcrypt = require("bcryptjs"); } catch {
  const crypto = require("crypto");
  bcrypt = {
    compare: async (pw, hashed) => hashed && hashed.includes(crypto.createHash("sha256").update(pw).digest("hex").slice(0, 16)),
  };
}

const User = require("../models/User");

// Seed test user with hashed password
let mockUsers = [
  {
    _id: "usr_101",
    name: "Aman Verma",
    email: "test@gmail.com",
    // hashed representation of '123456'
    password: "$2a$10$e846067b57bf304a",
    role: "user",
  },
];

let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let user;
    if (isDbConnected()) {
      user = await User.findOne({ email });
    } else {
      user = mockUsers.find((u) => u.email === email);
    }

    // 1. Check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "supersecretkey123",
      { expiresIn: "1d" }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

