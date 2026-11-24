const Student = require("../models/Student");

// In-memory fallback repository when MongoDB Atlas is unavailable in isolated environments
const mockStudents = [
  { _id: "65f8001", name: "Amit Sharma", age: 22, department: "Computer Science", createdAt: new Date() },
  { _id: "65f8002", name: "Riya Verma", age: 20, department: "Information Technology", createdAt: new Date() },
  { _id: "65f8003", name: "Rahul Patel", age: 24, department: "Management", createdAt: new Date() },
];

let isDbConnected = () => false;
try {
  const mongoose = require("mongoose");
  isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;
} catch {
  isDbConnected = () => false;
}

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    if (isDbConnected()) {
      const students = await Student.find();
      return res.json(students);
    }
    res.json(mockStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const student = await Student.findById(id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      return res.json(student);
    }
    const student = mockStudents.find((s) => s._id === id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create Student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, department } = req.body;
    if (!name || age === undefined) {
      return res.status(400).json({ error: "Name and age are required" });
    }
    if (age < 5 || age > 80) {
      return res.status(400).json({ error: "Age must be between 5 and 80" });
    }

    if (isDbConnected()) {
      const student = await Student.create(req.body);
      return res.status(201).json({ message: "Student Added", student });
    }

    const newStudent = {
      _id: "65f8" + (mockStudents.length + 1).toString(16),
      name,
      age: Number(age),
      department: department || "General",
      createdAt: new Date(),
    };
    mockStudents.push(newStudent);
    res.status(201).json({ message: "Student Added", student: newStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const student = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!student) return res.status(404).json({ error: "Student not found" });
      return res.json({ message: "Student Updated", student });
    }
    const student = mockStudents.find((s) => s._id === id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    Object.assign(student, req.body);
    res.json({ message: "Student Updated", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (isDbConnected()) {
      const student = await Student.findByIdAndDelete(id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      return res.json({ message: "Student Deleted", student });
    }
    const idx = mockStudents.findIndex((s) => s._id === id);
    if (idx === -1) return res.status(404).json({ error: "Student not found" });
    const deleted = mockStudents.splice(idx, 1)[0];
    res.json({ message: "Student Deleted", student: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
