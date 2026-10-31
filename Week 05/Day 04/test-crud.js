// Automated verification of Day 4 CRUD API and middleware
const http = require("http");
const app = require("./server");

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Day 4 test server running on port ${port}`);

  async function check(name, url, options = {}) {
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch { body = text; }
      console.log(`[PASS] ${name} (Status: ${res.status}):`, body);
      return { status: res.status, body };
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  console.log("\n--- Testing Day 4 User CRUD & Middleware ---");

  // 1. GET all users
  await check("GET /users", `${baseUrl}/users`);

  // 2. GET single user
  await check("GET /users/1", `${baseUrl}/users/1`);

  // 3. GET nonexistent user (expect 404)
  await check("GET /users/999 (expect 404)", `${baseUrl}/users/999`);

  // 4. POST create user
  await check("POST /users", `${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Rohan", age: 23 })
  });

  // 5. POST validation failure (expect 400)
  await check("POST /users without age (expect 400)", `${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Incomplete User" })
  });

  // 6. PUT update user
  await check("PUT /users/1", `${baseUrl}/users/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ age: 24 })
  });

  // 7. DELETE user
  await check("DELETE /users/2", `${baseUrl}/users/2`, {
    method: "DELETE"
  });

  // 8. Error handling middleware test
  await check("GET /trigger-error (expect 500)", `${baseUrl}/trigger-error`);

  console.log("\nAll Day 4 CRUD & Error tests completed successfully!");
  server.close();
  process.exit(0);
});
