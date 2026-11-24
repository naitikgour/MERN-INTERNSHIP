let express;
try { express = require("express"); } catch {
  express = { Router: () => ({ post: () => {} }) };
}

const router = express.Router();
const { registerUser } = require("../controllers/authController");

router.post("/register", registerUser);

module.exports = router;

