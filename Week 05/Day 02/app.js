// Week 5 - Day 2 - Task 3: Import and use math utility module
const math = require("./math");

console.log("=== Week 5 Day 2: Modular Math Utilities ===");
console.log("Addition (10 + 5):", math.add(10, 5));
console.log("Subtraction (10 - 5):", math.subtract(10, 5));
console.log("Multiplication (10 * 5):", math.multiply(10, 5));
console.log("Division (10 / 2):", math.divide(10, 2));
console.log("Division by Zero (10 / 0):", math.divide(10, 0));
