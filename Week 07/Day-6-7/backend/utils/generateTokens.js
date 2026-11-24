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
  };
}

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "default_access_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret", {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };

