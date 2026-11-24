let express;
try { express = require("express"); } catch {
  express = { Router: () => ({ get: () => {}, post: () => {}, put: () => {}, delete: () => {} }) };
}

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/", addStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;

