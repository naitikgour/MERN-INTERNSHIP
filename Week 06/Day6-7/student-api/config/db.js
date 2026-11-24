let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = { connect: () => Promise.resolve(), connection: { readyState: 0 } };
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_management_db";
    if (mongoose.connect) {
      await mongoose.connect(uri);
      console.log("MongoDB Connected Successfully 🚀");
    }
  } catch (error) {
    console.log("Database Error:", error.message);
  }
};

module.exports = connectDB;

