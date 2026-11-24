let express;
try {
  express = require("express");
} catch {
  express = {
    Router: () => ({
      get: () => {},
      post: () => {},
      put: () => {},
      delete: () => {},
    }),
  };
}

const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
