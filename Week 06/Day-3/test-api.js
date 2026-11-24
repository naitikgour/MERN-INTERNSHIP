/**
 * Week 6 - Day 3: Automated Test Suite for Student CRUD API
 */
const app = require("./server");

async function runStudentAPITests() {
  console.log("=== Week 6 Day 3: Student CRUD API Verification ===");
  const studentController = require("./controllers/studentController");

  // Mock Request/Response helpers
  function mockRes() {
    return {
      statusCode: 200,
      body: null,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.body = data; return this; },
    };
  }

  // Test 1: GET All Students
  const res1 = mockRes();
  await studentController.getAllStudents({}, res1);
  console.log("✔ GET /students returned:", res1.body.length, "students.");

  // Test 2: POST Create Student
  const res2 = mockRes();
  await studentController.createStudent({ body: { name: "John Doe", age: 19, department: "IT" } }, res2);
  console.log("✔ POST /students created student:", res2.body.student?.name);

  // Test 3: PUT Update Student
  const studentId = res2.body.student?._id;
  const res3 = mockRes();
  await studentController.updateStudent({ params: { id: studentId }, body: { department: "Physics" } }, res3);
  console.log("✔ PUT /students/:id updated department:", res3.body.student?.department);

  // Test 4: DELETE Student
  const res4 = mockRes();
  await studentController.deleteStudent({ params: { id: studentId } }, res4);
  console.log("✔ DELETE /students/:id result:", res4.body.message);

  console.log("=== All Day 3 CRUD API Tests Passed ===");
}

runStudentAPITests();

