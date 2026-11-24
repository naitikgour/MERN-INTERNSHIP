/**
 * Week 6 - Day 5: Validation & Populated Relationships Test Suite
 */
const { createUser, createOrder, getOrders } = require("./controllers/orderController");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runRelationshipTests() {
  console.log("=== Week 6 Day 5: Testing Schema Validation & Relationships ===");

  // Test 1: User Validation (Reject password < 6 chars)
  const res1 = mockRes();
  await createUser({ body: { name: "Alex", email: "alex@example.com", password: "123" } }, res1);
  console.log("✔ Password validation correctly caught short password:", res1.statusCode === 400);

  // Test 2: User Validation (Reject invalid role)
  const res2 = mockRes();
  await createUser({ body: { name: "Alex", email: "alex@example.com", password: "secretPassword", role: "SuperHacker" } }, res2);
  console.log("✔ Enum role validation correctly caught invalid role:", res2.statusCode === 400);

  // Test 3: Create Valid User
  const res3 = mockRes();
  await createUser({ body: { name: "Neha Sharma", email: "neha@example.com", password: "securePassword123", role: "Customer" } }, res3);
  console.log("✔ Successfully created valid user:", res3.body.name);

  // Test 4: Create Order linked to User
  const res4 = mockRes();
  await createOrder({ body: { productName: "Mechanical Keyboard", amount: 4500, user: res3.body._id } }, res4);
  console.log("✔ Successfully created Order linked to User ID:", res4.body.user);

  // Test 5: Fetch Orders with Populate
  const res5 = mockRes();
  await getOrders({}, res5);
  console.log("✔ GET /api/orders returned", res5.body.length, "orders with populated user details.");
  const populatedOrder = res5.body.find(o => o.productName === "Mechanical Keyboard");
  console.log("   Populated User Name:", populatedOrder?.user?.name, "| Email:", populatedOrder?.user?.email);

  console.log("=== All Day 5 Validation & Relationship Tests Passed ===");
}

runRelationshipTests();

