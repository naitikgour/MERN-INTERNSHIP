// Automated endpoint test script for Day 3 Express Server
const http = require("http");
const app = require("./index");

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Test server running on port ${port}`);

  async function test(name, url, options = {}) {
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch { body = text; }
      console.log(`[PASS] ${name}: status ${res.status} =>`, body);
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  console.log("\n--- Testing Day 3 Endpoints ---");
  await test("GET /", `${baseUrl}/`);
  await test("GET /about", `${baseUrl}/about`);
  await test("POST /contact", `${baseUrl}/contact`, { method: "POST" });
  await test("PUT /update", `${baseUrl}/update`, { method: "PUT" });
  await test("DELETE /remove", `${baseUrl}/remove`, { method: "DELETE" });
  await test("GET /api/user", `${baseUrl}/api/user`);
  await test("GET /users/42", `${baseUrl}/users/42`);
  await test("GET /search?name=John&age=22", `${baseUrl}/search?name=John&age=22`);

  console.log("\nAll Day 3 tests completed successfully!");
  server.close();
  process.exit(0);
});
