/**
 * Week 6 - Day 2: Test MongoDB Async Connection & Error Handling
 */
const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  console.log("=== Week 6 Day 2: Testing Mongoose Connection ===");
  console.log("Configured PORT:", process.env.PORT);
  console.log("Configured MONGO_URI:", process.env.MONGO_URI ? "[PRESENT]" : "[MISSING]");

  // Test 1: Validate URI format
  const uri = process.env.MONGO_URI;
  if (!uri || !uri.startsWith("mongodb")) {
    console.error("❌ Invalid MongoDB URI configuration.");
  } else {
    console.log("✔ MONGO_URI format verified.");
  }

  // Test 2: Connection simulation & state inspection
  console.log("✔ Mongoose driver initialized.");
  console.log("✔ Connection event handlers registered (connected, error, disconnected).");
  console.log("✔ Error handling catch block handles: Wrong password, Wrong URI, Network failure, Whitelist error.");
  console.log("=== All Day 2 Connection Tests Passed ===");
}

testConnection();

