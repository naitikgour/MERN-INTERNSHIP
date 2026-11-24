/**
 * Week 7 - Day 1: JWT Inspection, Decoding & Tampering Demo
 */
const crypto = require("crypto");

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return Buffer.from(base64, "base64").toString("utf8");
}

function createJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function decodeAndVerify(jwtToken, secret) {
  const [headerB64, payloadB64, signature] = jwtToken.split(".");
  const header = JSON.parse(base64UrlDecode(headerB64));
  const payload = JSON.parse(base64UrlDecode(payloadB64));

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${headerB64}.${payloadB64}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const isValid = signature === expectedSignature;
  return { header, payload, isValid };
}

function runJWTDay1Demo() {
  console.log("=== Week 7 Day 1: JWT Structure & Security Verification ===");
  const secret = "mySecretKey123";
  const userPayload = { id: 1, name: "Aman", role: "admin", iat: Math.floor(Date.now() / 1000) };

  const token = createJWT(userPayload, secret);
  console.log("1. Generated Valid JWT:\n", token);

  const verification = decodeAndVerify(token, secret);
  console.log("\n2. Decoded Header:", verification.header);
  console.log("3. Decoded Payload:", verification.payload);
  console.log("4. Signature Valid:", verification.isValid);

  // Tampering simulation: Attacker alters payload to role="superadmin"
  console.log("\n--- Task 2: Tampering Experiment ---");
  const [h, p, s] = token.split(".");
  const tamperedPayload = base64UrlEncode(JSON.stringify({ ...userPayload, role: "superadmin" }));
  const tamperedToken = `${h}.${tamperedPayload}.${s}`;
  const tamperedCheck = decodeAndVerify(tamperedToken, secret);
  console.log("5. Tampered Token Signature Valid:", tamperedCheck.isValid, "(Correctly rejected!)");

  console.log("\n✔ Day 1 JWT Concepts & Tamper Proofing Verified.");
}

runJWTDay1Demo();

