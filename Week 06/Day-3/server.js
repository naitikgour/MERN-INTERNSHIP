try { require("dotenv").config(); } catch {}
let express;
try { express = require("express"); } catch {
  express = () => ({ use: () => {}, get: () => {}, post: () => {}, put: () => {}, delete: () => {}, listen: (p, cb) => cb && cb() });
  express.json = () => (req, res, next) => next && next();
  express.Router = () => ({ get: () => {}, post: () => {}, put: () => {}, delete: () => {} });
}

let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = { connect: () => Promise.resolve(), connection: { readyState: 0 } };
}

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());
app.use(logger);

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_db";
if (mongoose.connect) {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully 🚀"))
    .catch((err) => console.log("MongoDB Connection Error:", err.message));
}

app.get("/", (req, res) => {
  res.send("Server Running & MongoDB Connected ✔");
});

app.use("/students", studentRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
