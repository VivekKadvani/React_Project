const express = require("express");
const router = express.Router();
const showlistRoute = require("./showlist")
const modifylistRoute = require("./listmodification");

router.use(showlistRoute);
router.use("/modification",modifylistRoute);

module.exports = router;