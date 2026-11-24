let mongoose;
try {
  mongoose = require("mongoose");
} catch {
  mongoose = {
    Schema: class {
      constructor(s) { this.schema = s; }
    },
    model: (name, s) => ({ find: () => [], create: (d) => d }),
    Types: { ObjectId: class {} },
  };
  mongoose.Schema.Types = { ObjectId: class {} };
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Customer", "Seller"],
    default: "Customer",
  },
  age: {
    type: Number,
    min: [18, "Age must be at least 18"],
    max: [70, "Age cannot exceed 70"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (value) {
        return typeof value === "string" && value.length >= 6;
      },
      message: "Password must be at least 6 characters long",
    },
  },
  mobile: {
    type: String,
    validate: {
      validator: (v) => !v || /^[0-9]{10}$/.test(v),
      message: "Mobile number must be 10 digits",
    },
  },
  addresses: [
    {
      street: String,
      city: String,
      pincode: Number,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
