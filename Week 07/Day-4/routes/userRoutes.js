let express;
try { express = require("express"); } catch {
  express = { Router: () => ({ get: () => {} }) };
}

const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

let mockUsers = [
  { _id: "usr_1", name: "Aman", email: "aman@example.com", role: "user" },
  { _id: "usr_2", name: "Sara Admin", email: "sara@example.com", role: "admin" },
];

// Protected route: only logged-in users can access
router.get("/users", protect, async (req, res) => {
  res.json({ message: "Protected users list", user: req.user, allUsers: mockUsers });
});

// Admin-only route
router.get("/admin/users", protect, authorizeRoles("admin"), async (req, res) => {
  res.json({ message: "Admin access granted", admin: req.user.name, users: mockUsers });
});

module.exports = router;

