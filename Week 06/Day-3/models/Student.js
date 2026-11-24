let mongoose;
try {
  mongoose = require("mongoose");
} catch {
  mongoose = {
    Schema: class { constructor(s) { this.schema = s; } },
    model: (name, s) => ({ find: () => [], create: (d) => d }),
    connection: { readyState: 0 },
  };
}

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Student age is required"],
    min: [5, "Age must be at least 5"],
    max: [80, "Age must be at most 80"],
  },
  department: {
    type: String,
    default: "General",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
