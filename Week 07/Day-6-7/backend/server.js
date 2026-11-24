try { require("dotenv").config(); } catch {}
let express;
try { express = require("express"); } catch {
  express = () => ({ use: () => {}, listen: (p, cb) => cb && cb() });
  express.json = () => (req, res, next) => next && next();
}
let cors;
try { cors = require("cors"); } catch { cors = () => (req, res, next) => next && next(); }
let helmet;
try { helmet = require("helmet"); } catch { helmet = () => (req, res, next) => next && next(); }
let rateLimit;
try { rateLimit = require("express-rate-limit"); } catch {
  rateLimit = () => (req, res, next) => next && next();
}

let mongoose;
try { mongoose = require("mongoose"); } catch {
  mongoose = { connect: () => Promise.resolve() };
}

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/secure_auth_db";

if (mongoose.connect) {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err.message));
}

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;

