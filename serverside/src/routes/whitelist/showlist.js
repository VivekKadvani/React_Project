const express = require("express");
const showList = require("../../controller/whitelist/showList");
const router = express.Router();

const {
    whitelistingValidation
} = require("../../middleware/validation")

router.get("/list", whitelistingValidation, showList);

module.exports = router;