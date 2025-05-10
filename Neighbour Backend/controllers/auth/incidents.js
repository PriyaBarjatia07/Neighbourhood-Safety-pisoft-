const reportModel = require("../../models/report.model");

const getIncidents = async (req, res, next) => {
    try {
        console.log("Entered incident endppoint...")
        const incidents = await reportModel.find(); // Await the promise
        res.json(incidents);
        

    } catch (err) {
        res.status(500).json({message: error.message});
    }
};

module.exports = getIncidents;