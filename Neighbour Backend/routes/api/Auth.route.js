
const route = require("express").Router()

const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")
const report =require("../../controllers/auth/report")

const upload = require("../../middleware/multer.js");
const addUser = require("../../controllers/auth/addUser.js");

const getUsers = require("../../controllers/auth/users.js");
const getIncidents = require("../../controllers/auth/incidents.js");
const getLocation= require("../../controllers/auth/getLocations.js");
const updateUser = require("../../controllers/auth/updateUser.js");
const deleteUser = require("../../controllers/auth/deleteUser.js");
const google = require("../../controllers/auth/google.js");
const forgotPassword = require("../../controllers/auth/forgotPassword.js");
const verifyPassword = require("../../controllers/auth/verifyPassword.js");
// const getReports = require("../../controllers/auth/getReports.js");
// const { forgotPassword } = require("../../controllers/auth/forgotPassword");
// const { resetPassword } = require("../../controllers/auth/resetPassword");
route.post("/register", register)
route.post("/login", login)
route.post("/report",report);
// route.post("/admin", admin)
// route.post("/upload",uploadFile);
// route.post("/forgot-password", forgotPassword);
// route.post("/reset-password/:token", resetPassword);

  route.post("/report", upload.array("media", 10), async (req, res) => {
    try {
      const { incidentType, description, severity, location, anonymous } = req.body;
  
      const mediaFiles = req.files.map(file => file.filename); // uploaded filenames
  
      const newReport = new ReportModel({
        incidentType,
        description,
        severity,
        location,
        anonymous,
        media: mediaFiles
      });
  
      await newReport.save();
  
      res.json({ success: true, redirectTo: "/home" });
    } catch (err) {
      console.error("Report submission error:", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });
    
route.get("/getUsers",getUsers);
route.get("/getIncidents",getIncidents);
route.get("/getLocation",getLocation);
route.post("/addUser",addUser)
route.post("/google",google)
route.post("/forgotPassword",forgotPassword)
route.post("/verifyPassword",verifyPassword)
route.put("/updateUser/:id",updateUser);
route.delete("/deleteUser/:id",deleteUser)

module.exports = route;
