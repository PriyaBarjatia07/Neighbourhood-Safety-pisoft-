const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // path to your upload.js
const path = require("path");

router.post("/submit", upload.array("media"), async (req, res) => {
  try {
    const { incidentType, description, severity, location, anonymous } = req.body;
    const mediaFiles = req.files;

    console.log("Received data:", { incidentType, description, severity, location, anonymous });
    console.log("Uploaded files:", mediaFiles);

    // You can store file paths in DB, like mediaFiles.map(f => f.path)

    res.json({ success: true, message: "Report submitted successfully." });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
