let bcrypt;
try { bcrypt = require("bcryptjs"); } catch {
  const crypto = require("crypto");
  bcrypt = {
    hash: async (pw, saltRounds) => `$2a$10$mockSalt_${crypto.createHash("sha256").update(pw).digest("hex").slice(0, 22)}`,
    compare: async (pw, hashed) => hashed && hashed.includes(crypto.createHash("sha256").update(pw).digest("hex").slice(0, 22)),
  };
}

const User = require("../models/User");

let mockUsers = [];
let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if email already exists
    if (isDbConnected()) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
    } else {
      if (mockUsers.some((u) => u.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    let newUser;
    if (isDbConnected()) {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });
    } else {
      newUser = {
        _id: "usr_" + (mockUsers.length + 1),
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      };
      mockUsers.push(newUser);
    }

    // 5. Response (never send plain password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

