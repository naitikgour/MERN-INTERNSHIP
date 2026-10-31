// Week 5 - Day 1 - Task 2: Read and write files using fs module
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "student.txt");

// Write file
fs.writeFile(filePath, "Welcome to Node.js!", (err) => {
  if (err) throw err;
  console.log("File written successfully!");

  // Read file after writing
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log("File content:", data);
  });
});
