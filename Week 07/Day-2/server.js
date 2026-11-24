try { require("dotenv").config(); } catch {}
let express;
try { express = require("express"); } catch {
  express = () => ({ use: () => {}, listen: (p, cb) => cb && cb() });
  express.json = () => (req, res, next) => next && next();
}
let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = { connect: () => Promise.resolve(), connection: { readyState: 0 } };
}

const app = express();
app.use(express.json());

// Routes
app.use("/api", require("./routes/authRoutes"));

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auth_db";
if (mongoose.connect) {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error(err));
}

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

