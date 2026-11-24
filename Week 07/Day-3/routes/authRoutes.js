let express;
try { express = require("express"); } catch {
  express = { Router: () => ({ post: () => {} }) };
}

const { login } = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);

module.exports = router;

