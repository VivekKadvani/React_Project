const express = require("express");
const router = express.Router()
const showlistRoute = require("./showlist");
const findVestingRoute = require("./findvesting");


router.use(showlistRoute);
router.use("/findvesting",findVestingRoute);

module.exports = router;