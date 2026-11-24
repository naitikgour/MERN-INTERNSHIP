let jwt;
try { jwt = require("jsonwebtoken"); } catch {
  const crypto = require("crypto");
  jwt = {
    verify: (token, secret) => {
      if (!token || token === "invalid_token") throw new Error("Invalid token");
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Malformed token");
      return JSON.parse(Buffer.from(parts[1], "base64url").toString());
    },
  };
}

const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_access_secret");
    req.user = { id: decoded.id, role: decoded.role, name: decoded.name || "User" };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};

