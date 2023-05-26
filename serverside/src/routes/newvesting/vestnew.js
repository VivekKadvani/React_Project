const express = require("express");
const locktoken = require("../../controller/new-vesting/locktoken");
const router = express.Router();

router.post("/locktoken",locktoken);

module.exports = router;