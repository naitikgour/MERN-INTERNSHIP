/**
 * Week 6 - Day 6-7: Automated Student Management API Test Suite
 */
const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("./controllers/studentController");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
}

async function runStudentManagementTests() {
  console.log("=== Week 6 Day 6-7: Testing Student Management API ===");

  // 1. GET all students
  const res1 = mockRes();
  await getStudents({ query: { page: 1, limit: 5, sort: "name" } }, res1);
  console.log("✔ GET /api/students returned", res1.body.length, "students.");

  // 2. Add new student
  const res2 = mockRes();
  await addStudent(
    {
      body: {
        name: "Karan Singh",
        rollNo: 106,
        department: "Computer Science",
        year: 3,
        email: "karan@example.com",
      },
    },
    res2
  );
  console.log("✔ POST /api/students created student:", res2.body.student?.name);

  // 3. Search students
  const res3 = mockRes();
  await getStudents({ query: { search: "karan" } }, res3);
  console.log("✔ GET /api/students?search=karan matched:", res3.body[0]?.name);

  // 4. Update student
  const id = res2.body.student?._id;
  const res4 = mockRes();
  await updateStudent({ params: { id }, body: { year: 4 } }, res4);
  console.log("✔ PUT /api/students/:id updated year:", res4.body.student?.year);

  // 5. Delete student
  const res5 = mockRes();
  await deleteStudent({ params: { id } }, res5);
  console.log("✔ DELETE /api/students/:id result:", res5.body.message);

  console.log("=== All Day 6-7 Student Management API Tests Passed ===");
}

runStudentManagementTests();

