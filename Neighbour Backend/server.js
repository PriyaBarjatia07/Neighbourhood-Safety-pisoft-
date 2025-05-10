const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const backend = express();
const http = require("http").Server(backend);


mongoose.connect("mongodb+srv://arshsandal50:b4f4SeltbzMaRsB2@backend.zgxsu.mongodb.net/")
.then(() => {
    console.log(colors.green("✓ DB is connected with Backend"));
    const PORT = 5000;
    http.listen(PORT, () => {
        console.log(colors.cyan(`Server is listening on port ${PORT}`));
    });
})
.catch((error) => {
    console.error(colors.red("Error connecting to DB:", error));
});

backend.get("/", (req, res) => {
    res.send("Welcome to the Backend Server!");
});
