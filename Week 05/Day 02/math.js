// Week 5 - Day 2 - Task 3: Math Utility Module
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
