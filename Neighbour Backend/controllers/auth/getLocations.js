const Report = require("../../models/report.model");

// Haversine formula to calculate distance in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const getNearbyReports = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // Fetch all reports from DB
    const allReports = await Report.find();

    // Count of all incident types (across full DB)
    const allIncidentCounts = allReports.reduce((acc, report) => {
      const type = report.incidentType.toLowerCase().replace(/\s+/g, "_");
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Filter nearby reports (within 5km radius)
    const nearbyReports = allReports.filter((report) => {
      if (!report.location) return false;

      const [repLatStr, repLngStr] = report.location.split(',').map(s => s.trim());
      const repLat = parseFloat(repLatStr);
      const repLng = parseFloat(repLngStr);
      if (isNaN(repLat) || isNaN(repLng)) return false;

      const distance = getDistanceFromLatLonInKm(userLat, userLng, repLat, repLng);
      return distance <= 5;
    });

    // Count of incident types in nearby reports
    const incidentCounts = nearbyReports.reduce((acc, report) => {
      const type = report.incidentType.toLowerCase().replace(/\s+/g, "_");
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      totalReportsCount: allReports.length,
      nearbyReports,
      allReports,
      nearbyReportsCount: nearbyReports.length,
      incidentCounts,        // incidents near user
      allIncidentCounts,     // all incidents in        // full list of all reports
    });

  } catch (error) {
    console.error("Error in getNearbyReports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getNearbyReports;
