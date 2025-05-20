const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
  incidentType: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, required: true },
  location: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  media: [{
    name: String,
    type: String,
    content: String
  }],
  createdAt: { type: Date, default: Date.now },
  
});

module.exports = model("Report", reportSchema,"reports");
