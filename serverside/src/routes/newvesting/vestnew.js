const express = require("express");
const locktoken = require("../../controller/new-vesting/locktoken");
const router = express.Router();

const {lockingValidation} = require("../../middleware/validation")

router.post("/locktoken",lockingValidation,locktoken);

module.exports = router;