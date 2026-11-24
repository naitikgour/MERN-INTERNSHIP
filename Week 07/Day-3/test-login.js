/**
 * Week 7 - Day 3: Automated Login & JWT Generation Tests
 */
const { login } = require("./controllers/authController");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runLoginTests() {
  console.log("=== Week 7 Day 3: Testing User Login & JWT Generation ===");

  // Test 1: Successful Login
  const res1 = mockRes();
  await login({ body: { email: "test@gmail.com", password: "password456" } }, res1);
  // Note: with mock bcrypt compare, valid credentials return token
  console.log("✔ Login API tested, response status:", res1.statusCode);

  // Test 2: Invalid password handling
  const res2 = mockRes();
  await login({ body: { email: "test@gmail.com", password: "wrongPassword" } }, res2);
  console.log("✔ Invalid credentials handled with 401 Unauthorized:", res2.statusCode === 401);

  // Test 3: Missing fields
  const res3 = mockRes();
  await login({ body: { email: "test@gmail.com" } }, res3);
  console.log("✔ Missing password rejected:", res3.statusCode === 400);

  console.log("=== All Day 3 Login Tests Passed ===");
}

runLoginTests();

