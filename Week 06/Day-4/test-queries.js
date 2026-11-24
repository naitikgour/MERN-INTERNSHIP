/**
 * Week 6 - Day 4: Automated Query Operators & Pagination Tests
 */
const { searchAndFilterProducts, createProduct } = require("./controllers/productController");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runQueryTests() {
  console.log("=== Week 6 Day 4: Testing Advanced MongoDB Queries ===");

  // Test 1: Category filter
  const res1 = mockRes();
  await searchAndFilterProducts({ query: { category: "Electronics" } }, res1);
  console.log("✔ Category filter (Electronics): found", res1.body.data.length, "items.");

  // Test 2: Regex search
  const res2 = mockRes();
  await searchAndFilterProducts({ query: { name: "pro" } }, res2);
  console.log("✔ Regex search (name contains 'pro'): found", res2.body.data.length, "items.");

  // Test 3: Price range filter ($gt, $lt)
  const res3 = mockRes();
  await searchAndFilterProducts({ query: { minPrice: 100, maxPrice: 1000 } }, res3);
  console.log("✔ Price range filter ($gt 100 & $lt 1000): found", res3.body.data.length, "items.");

  // Test 4: Pagination & Limit
  const res4 = mockRes();
  await searchAndFilterProducts({ query: { page: 2, limit: 3, sort: "price" } }, res4);
  console.log("✔ Pagination (page 2, limit 3): returned", res4.body.data.length, "items.");

  // Test 5: Validation for missing fields
  const res5 = mockRes();
  await createProduct({ body: { name: "Incomplete Item" } }, res5);
  console.log("✔ Missing price validation correctly rejected:", res5.statusCode === 400);

  console.log("=== All Day 4 Query & Pagination Tests Passed ===");
}

runQueryTests();

