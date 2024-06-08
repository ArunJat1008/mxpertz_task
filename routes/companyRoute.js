const router = require("express").Router();
const {
  getCompanies,
  addcompany,
} = require("../controllers/companyController");
const authJwt = require("../middleware/authMiddleware");

router.post("/addCompany", authJwt, addcompany);
router.get("/getCompanies", authJwt, getCompanies);

module.exports = router;
