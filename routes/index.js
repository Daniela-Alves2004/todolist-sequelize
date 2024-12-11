var express = require('express')
var router = express.Router()
var taskRouter = require("./routerTask")

router.get("/", (req, res) => {
    res.json({status: true, msg: "Hello World!"})
})

router.use("/task", taskRouter)

module.exports = router;
