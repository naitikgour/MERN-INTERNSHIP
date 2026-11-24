let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = {
    Schema: class { constructor(s, opt) { this.schema = s; this.options = opt; } },
    model: (name, s) => ({ find: () => [], create: (d) => d }),
  };
  mongoose.Schema.Types = { ObjectId: class {} };
}

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    rollNo: { type: Number, required: [true, "Roll number is required"], unique: true },
    department: { type: String, required: [true, "Department is required"] },
    year: { type: Number, required: [true, "Year is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true },
    courses: [{ type: mongoose.Schema.Types?.ObjectId || String, ref: "Course" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

