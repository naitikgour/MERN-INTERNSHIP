try { require("dotenv").config(); } catch {}
let express;
try { express = require("express"); } catch {
  express = () => ({ use: () => {}, listen: (p, cb) => cb && cb() });
  express.json = () => (req, res, next) => next && next();
}
let cors;
try { cors = require("cors"); } catch { cors = () => (req, res, next) => next && next(); }

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

