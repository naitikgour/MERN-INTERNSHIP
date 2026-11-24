let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = {
    Schema: class { constructor(s) { this.schema = s; } },
    model: (name, s) => ({ findOne: () => null, create: (d) => d }),
  };
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);

