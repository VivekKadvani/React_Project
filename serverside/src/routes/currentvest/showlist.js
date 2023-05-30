const express = require("express");
const showList = require("../../controller/current-vesting/showlist");
const router = express.Router();

router.get("/list",showList);

module.exports = router;