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
  // coordinates: {
  //   type: [Number],  // [longitude, latitude]
  //   index: "2dsphere",  // Geospatial index
  //   required: true,
  // },
});

module.exports = model("Report", reportSchema,"reports");
