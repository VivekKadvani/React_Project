const express = require("express");
const router = express.Router()
const showlistRoute = require("./showlist");
const findVestingRoute = require("./findvesting");
const bodyParser = require("body-parser");
const cors = require("cors");


router.use(showlistRoute);
router.use("/findvesting",findVestingRoute);

module.exports = router;