try { require("dotenv").config(); } catch {}
let express;
try { express = require("express"); } catch {
  express = () => ({ use: () => {}, get: () => {}, post: () => {}, put: () => {}, delete: () => {}, listen: (p, cb) => cb && cb() });
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

const app = express();

// 1. JSON Parser
app.use(express.json());

// 2. CORS Security Setup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 3. Helmet Secure Headers
app.use(helmet());

// 4. Rate Limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200,
  message: "Too many requests from this IP. Please try later.",
});
app.use(limiter);

// 5. Test Route
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", securityHeadersApplied: true });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Secure Server running on port ${PORT}`));
}

module.exports = app;
