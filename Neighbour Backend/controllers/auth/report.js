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
    
    });
    
    
  } catch (error) {
    next(error);
  }

 };

module.exports =  report ;
