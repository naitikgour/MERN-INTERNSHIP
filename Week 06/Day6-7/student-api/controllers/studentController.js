const Student = require("../models/studentModel");

let mockStudents = [
  { _id: "65fd0001", name: "Rahul Sharma", rollNo: 101, department: "Computer Science", year: 3, email: "rahul@example.com", courses: [], createdAt: new Date("2026-01-10") },
  { _id: "65fd0002", name: "Ananya Sen", rollNo: 102, department: "Information Technology", year: 2, email: "ananya@example.com", courses: [], createdAt: new Date("2026-01-12") },
  { _id: "65fd0003", name: "Vikram Malhotra", rollNo: 103, department: "Computer Science", year: 4, email: "vikram@example.com", courses: [], createdAt: new Date("2026-01-15") },
  { _id: "65fd0004", name: "Sneha Roy", rollNo: 104, department: "Mechanical", year: 1, email: "sneha@example.com", courses: [], createdAt: new Date("2026-01-18") },
  { _id: "65fd0005", name: "Arjun Das", rollNo: 105, department: "Civil", year: 2, email: "arjun@example.com", courses: [], createdAt: new Date("2026-01-20") },
];

let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

// ➤ Add new student
exports.addStudent = async (req, res) => {
  try {
    const { name, rollNo, department, year, email } = req.body;
    if (!name || !rollNo || !department || !year || !email) {
      return res.status(400).json({ error: "All student fields are required: name, rollNo, department, year, email" });
    }

    if (isDbConnected()) {
      const student = await Student.create(req.body);
      return res.status(201).json({ message: "Student added", student });
    }

    if (mockStudents.some((s) => s.rollNo === Number(rollNo) || s.email === email)) {
      return res.status(400).json({ error: "Roll number or Email already exists" });
    }

    const newStudent = {
      _id: "65fd" + (mockStudents.length + 10).toString(16),
      name,
      rollNo: Number(rollNo),
      department,
      year: Number(year),
      email,
      courses: req.body.courses || [],
      createdAt: new Date(),
    };
    mockStudents.push(newStudent);
    res.status(201).json({ message: "Student added", student: newStudent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ➤ Get all students (with pagination, sorting & search)
exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 5, sort = "name", search } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, parseInt(limit));

    if (isDbConnected()) {
      let query = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      const students = await Student.find(query)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .populate("courses");
      return res.json(students);
    }

    let results = [...mockStudents];
    if (search) {
      const reg = new RegExp(search, "i");
      results = results.filter((s) => reg.test(s.name) || reg.test(s.department));
    }

    results.sort((a, b) => {
      const valA = a[sort] || "";
      const valB = b[sort] || "";
      return valA > valB ? 1 : -1;
    });

    const start = (pageNum - 1) * limitNum;
    const paginated = results.slice(start, start + limitNum);
    res.json(paginated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➤ Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const student = await Student.findById(id).populate("courses");
      if (!student) return res.status(404).json({ message: "Student not found" });
      return res.json(student);
    }

    const student = mockStudents.find((s) => s._id === id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: "Invalid student ID" });
  }
};

// ➤ Update student record
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
      if (!student) return res.status(404).json({ message: "Student not found" });
      return res.json({ message: "Student updated", student });
    }

    const student = mockStudents.find((s) => s._id === id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    Object.assign(student, req.body);
    res.json({ message: "Student updated", student });
  } catch (error) {
    res.status(400).json({ error: "Invalid update request" });
  }
};

// ➤ Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const student = await Student.findByIdAndDelete(id);
      if (!student) return res.status(404).json({ message: "Student not found" });
      return res.json({ message: "Student deleted" });
    }

    const idx = mockStudents.findIndex((s) => s._id === id);
    if (idx === -1) return res.status(404).json({ message: "Student not found" });
    mockStudents.splice(idx, 1);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

