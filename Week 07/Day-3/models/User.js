let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = {
    Schema: class { constructor(s) { this.schema = s; } },
    model: (name, s) => ({ findOne: () => null, create: (d) => d }),
  };
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);

