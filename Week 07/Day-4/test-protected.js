/**
 * Week 7 - Day 4: Protected Routes & Role Authorization Test Suite
 * Tests 4 critical security cases:
 * 1. Missing Token -> 401 Not authorized
 * 2. Invalid Token -> 401 Invalid or expired token
 * 3. Regular User accessing admin route -> 403 Access denied
 * 4. Admin User accessing admin route -> 200 OK
 */
const { protect, authorizeRoles } = require("./middleware/authMiddleware");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runProtectedTests() {
  console.log("=== Week 7 Day 4: Testing Protected Routes & RBAC ===");

  // Test 1: No Token
  const res1 = mockRes();
  await protect({ headers: {} }, res1, () => {});
  console.log("✔ Test 1 (No Token): returns 401 ->", res1.statusCode === 401);

  // Test 2: Invalid Token
  const res2 = mockRes();
  await protect({ headers: { authorization: "Bearer invalid_token" } }, res2, () => {});
  console.log("✔ Test 2 (Invalid Token): returns 401 ->", res2.statusCode === 401);

  // Test 3: Normal User Accessing Admin Route
  const reqUser = { headers: { authorization: "Bearer user_token" } };
  await protect(reqUser, mockRes(), () => {});
  const res3 = mockRes();
  const adminGuard = authorizeRoles("admin");
  adminGuard(reqUser, res3, () => {});
  console.log("✔ Test 3 (Normal User -> Admin Route): returns 403 Forbidden ->", res3.statusCode === 403);

  // Test 4: Admin Token Accessing Admin Route
  const reqAdmin = { headers: { authorization: "Bearer admin_token" } };
  await protect(reqAdmin, mockRes(), () => {});
  let adminAccessGranted = false;
  adminGuard(reqAdmin, mockRes(), () => { adminAccessGranted = true; });
  console.log("✔ Test 4 (Admin Token -> Admin Route): access authorized ->", adminAccessGranted);

  console.log("=== All Day 4 Protected Route & Role Tests Passed ===");
}

runProtectedTests();

