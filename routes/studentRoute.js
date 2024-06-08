const router = require("express").Router();
const authJwt = require("../middleware/authMiddleware");
const { getStudents, addStudent } = require("../controllers/studentController");

router.post("/addStudent", authJwt, addStudent);
router.get("/getStudents", authJwt, getStudents);

module.exports = router;
