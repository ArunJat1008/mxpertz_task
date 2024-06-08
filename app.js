const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const sequelize = require("./config/database");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const authRoute = require("./routes/authRoute");
const companyRoute = require("./routes/companyRoute");
const studentCompanyInterviewRoute = require("./routes/studentCompanyInterviewRoute");
const studentRoute = require("./routes/studentRoute");

app.use("/auth", authRoute);
app.use("/company", companyRoute);
app.use("/student", studentRoute);
app.use("/studentInterview", studentCompanyInterviewRoute);

const PORT = process.env.PORT;

sequelize.sync().then(() => {
  console.log("All models connected successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
