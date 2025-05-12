const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
require("dotenv").config();
const backend = express();
const http = require("http").Server(backend);
const cors = require("cors")
const routes = require("./routes")
// const contactRoute = require("./routes/api/contact.route");
// const doctorAccessRoute=require("./routes/api/doctorAccess.route");

// const uploadRoutes=require("./routes/api/upload");
const path = require('path');
// const ReportModel= require("./models/report.model");
// Old
// app.use(express.json());

// New — increase limit to 50MB or more
backend.use(express.json({ limit: '100mb' }));
backend.use(express.urlencoded({ extended: true, limit: '100mb' }));

backend.use(cors({
    origin: "*",
    methods : ["GET", "PUT", "PATCH", "POST", "DELETE"]
})
);

backend.use(routes);
// backend.use("/api/contact", contactRoute);
// backend.use("/api/doctor", doctorAccessRoute);
// backend.use("/api",uploadRoutes);
// backend.use('/uploads', express.static('uploads'));




mongoose.connect("mongodb+srv://priyabarjatia1280:H1jAygpNIxduehNt@cluster1.0yizu2u.mongodb.net/")
.then(() => {
    console.log(colors.green("✓ DB is connected with Backend"));
    const PORT =5001;
    http.listen(PORT, () => {
        console.log(colors.cyan(`Server is listening on port ${PORT}`));
    });
})
.catch((error) => {
    console.error(colors.red("Error connecting to DB:", error));
});

