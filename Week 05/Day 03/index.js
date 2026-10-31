// Week 5 - Day 3: Getting Started with Express.js
const express = require("express");
const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Enable simple CORS headers for browser testing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Task 1: Basic routes
app.get("/", (req, res) => {
  res.send("Express API is working...");
});

app.get("/about", (req, res) => {
  res.send("This is the About page!");
});

app.post("/contact", (req, res) => {
  res.send("Contact form submitted!");
});

// Additional HTTP methods from curriculum
app.put("/update", (req, res) => {
  res.send("Data updated using PUT!");
});

app.delete("/remove", (req, res) => {
  res.send("Data deleted!");
});

// Task 2: Return User Data in JSON Format
app.get("/api/user", (req, res) => {
  res.json({
    id: 1,
    name: "Ananya",
    role: "Intern",
    skills: ["Node.js", "Express.js", "Git"]
  });
});

// Task 3: Route Parameters
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is: ${userId}`);
});

// Task 3: Query Strings
app.get("/search", (req, res) => {
  const query = req.query;
  res.json(query);
});

// Export app for test runner and listen if run directly
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
