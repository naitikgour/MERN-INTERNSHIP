let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = {
    Schema: class { constructor(s) { this.schema = s; } },
    model: (name, s) => ({ find: () => [], create: (d) => d }),
  };
}

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema);

