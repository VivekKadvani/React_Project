const express = require("express");
const showList = require("../../controller/whitelist/showList");
const router = express.Router();

router.get("/list",showList);

module.exports = router;