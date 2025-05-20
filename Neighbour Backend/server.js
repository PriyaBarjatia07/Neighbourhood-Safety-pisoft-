const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
require("dotenv").config();
const backend = express();
const http = require("http").Server(backend);
const cors = require("cors")
const routes = require("./routes")

const path = require('path');

backend.use(cors({
    origin: "*",
    methods : ["GET", "PUT", "PATCH", "POST", "DELETE"],
    
}));


backend.use(express.json({ limit: '100mb' }));
backend.use(express.urlencoded({ extended: true, limit: '100mb' }));




backend.use(routes);





mongoose.connect("mongodb+srv://priyabarjatia1280:B376IInuAC4M6XK8@cluster1.0yizu2u.mongodb.net/")
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

