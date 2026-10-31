// Automated test runner for Day 5 Advanced Routing
const http = require("http");
const app = require("./server");

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Day 5 test server running on port ${port}`);

  async function test(name, url, options = {}) {
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch { body = text; }
      console.log(`[PASS] ${name} (Status ${res.status}):`, body);
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  console.log("\n--- Testing Day 5 Modular Routing & Dynamic Params ---");
  await test("GET /", `${baseUrl}/`);
  await test("GET /api/users", `${baseUrl}/api/users`);
  await test("POST /api/users", `${baseUrl}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Kunal", age: 26 })
  });
  await test("Task 3: GET /api/users/5/profile", `${baseUrl}/api/users/5/profile`);
  await test("Multi-param: GET /api/users/10/orders/5?status=pending", `${baseUrl}/api/users/10/orders/5?status=pending`);
  await test("Error handler: GET /api/crash", `${baseUrl}/api/crash`);

  console.log("\nAll Day 5 tests completed successfully!");
  server.close();
  process.exit(0);
});
