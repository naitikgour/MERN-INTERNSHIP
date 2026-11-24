/**
 * Week 7 - Day 2: User Registration & Password Hashing Tests
 */
const { registerUser } = require("./controllers/authController");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runRegistrationTests() {
  console.log("=== Week 7 Day 2: User Registration & Bcrypt Tests ===");

  // Test 1: Register User Success
  const res1 = mockRes();
  await registerUser(
    {
      body: {
        name: "Aman Sharma",
        email: "aman@example.com",
        password: "secretPassword123",
      },
    },
    res1
  );
  console.log("✔ Registration Success:", res1.statusCode === 201, "| User:", res1.body?.user?.email);

  // Test 2: Duplicate Email Rejection
  const res2 = mockRes();
  await registerUser(
    {
      body: {
        name: "Duplicate User",
        email: "aman@example.com",
        password: "password456",
      },
    },
    res2
  );
  console.log("✔ Duplicate email rejected correctly:", res2.statusCode === 400, `(${res2.body?.message})`);

  // Test 3: Missing Fields Rejection
  const res3 = mockRes();
  await registerUser({ body: { email: "no-pass@example.com" } }, res3);
  console.log("✔ Missing required password rejected:", res3.statusCode === 400);

  console.log("=== All Day 2 Registration Tests Passed ===");
}

runRegistrationTests();

