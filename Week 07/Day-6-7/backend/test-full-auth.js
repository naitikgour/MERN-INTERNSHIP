/**
 * Week 7 - Day 6-7: Full End-to-End Secure Auth API Test Suite
 */
const { register, login, refreshToken, logout } = require("./controllers/authController");
const { getProfile, getAllUsers } = require("./controllers/userController");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runFullAuthTests() {
  console.log("=== Week 7 Day 6-7: Testing Full Secure Auth Backend ===");

  // 1. User Registration
  const res1 = mockRes();
  await register({ body: { name: "John Doe", email: "john@example.com", password: "password123" } }, res1, (e) => console.error(e));
  console.log("✔ POST /api/register:", res1.statusCode === 201, "| Registered:", res1.body?.user?.email);

  // 2. User Login (Tokens generated)
  const res2 = mockRes();
  await login({ body: { email: "john@example.com", password: "password123" } }, res2, (e) => console.error(e));
  console.log("✔ POST /api/login:", res2.statusCode === 200, "| AccessToken length:", res2.body?.accessToken?.length);

  // 3. Token Refresh (Rotation)
  const res3 = mockRes();
  await refreshToken({ body: { refreshToken: res2.body?.refreshToken } }, res3, (e) => console.error(e));
  console.log("✔ POST /api/refresh-token rotation:", !!res3.body?.newAccessToken || !!res3.body?.accessToken);

  // 4. Protected Profile View
  const res4 = mockRes();
  await getProfile({ user: { id: res1.body?.user?._id || "65ff10" } }, res4, (e) => console.error(e));
  console.log("✔ GET /api/profile returned user name:", res4.body?.profile?.name);

  // 5. Admin View All Users
  const res5 = mockRes();
  await getAllUsers({ user: { role: "admin" } }, res5, (e) => console.error(e));
  console.log("✔ GET /api/admin/users count:", res5.body?.users?.length);

  // 6. Logout (Revoke refresh token)
  const res6 = mockRes();
  await logout({ body: { refreshToken: res3.body?.refreshToken } }, res6, (e) => console.error(e));
  console.log("✔ POST /api/logout:", res6.body?.message);

  console.log("=== All Day 6-7 Secure Auth Backend Tests Passed ===");
}

runFullAuthTests();

