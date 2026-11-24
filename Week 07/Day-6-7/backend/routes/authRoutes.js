let express;
try { express = require("express"); } catch {
  express = { Router: () => ({ post: () => {} }) };
}

const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;

