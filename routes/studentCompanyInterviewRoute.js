const router = require("express").Router();
const authJwt = require("../middleware/authMiddleware");
const {
  scheduleInterview,
  updateInterviewStatus,
} = require("../controllers/studentCompanyInterviewController");

router.post("/scheduleInterview", authJwt, scheduleInterview);
router.put("/updateInterviewStatus", authJwt, updateInterviewStatus);

module.exports = router;
