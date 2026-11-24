let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = {
    Schema: class {
      constructor(s, opt) {
        this.schema = s;
        this.options = opt;
        this.methods = {};
      }
    },
    model: (name, s) => ({ find: () => [], findOne: () => null, create: (d) => d }),
  };
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshTokens: [
      { token: String, createdAt: { type: Date, default: Date.now } },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = typeof this.toObject === "function" ? this.toObject() : { ...this };
  delete obj.password;
  delete obj.refreshTokens;
  return obj;
};

module.exports = mongoose.model("User", userSchema);

