
const router = require("express").Router()

const authRoutes = require("./Auth.route.js")
// const reportRoutes= require("./Report.route.js")
router.use("/auth", authRoutes)
// router.use("/report", reportRoutes)

module.exports = router