let express;
try { express = require("express"); } catch {
  express = { Router: () => ({ get: () => {}, put: () => {} }) };
}

const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);
router.get("/admin/users", protect, authorize("admin"), userController.getAllUsers);

module.exports = router;

