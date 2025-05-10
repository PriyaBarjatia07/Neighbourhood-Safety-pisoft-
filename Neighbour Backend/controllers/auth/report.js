const Report = require("../../models/report.model");

const report = async (req, res,next) => {
  try {
    const { incidentType, description, severity, location, anonymous, media } = req.body;

    const newReport = new Report({
      incidentType:incidentType,
      description,
      severity,
      location,
      anonymous,
      media
    });
console.log(newReport)
    await newReport.save();
    console.log("Report Registered Successfully"); 
    return res.status(201).json({
      message: "Report registered successfully 🎉",
      success:true,
      message: "Report Registered successfully 🎉"
    //   isNewUser: true,
    //   Username: newUser.Username,
    //   email: newUser.email,
    //   redirectTo: "/login",
    });
    
    
  } catch (error) {
    next(error);
  }
//     console.log("New Report Saved:", newReport);

//     res.status(201).json({ success: true, message: "Report submitted successfully!" });
//   } catch (err) {
//     console.error("Error submitting report:", err);
//     res.status(500).json({ success: false, message: "Failed to submit report." });
//   }
 };

module.exports =  report ;
