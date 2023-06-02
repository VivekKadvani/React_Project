const express = require("express");
const showList = require("../../controller/current-vesting/showlist");
const router = express.Router();
const {
    currentListingValidation
} = require("../../middleware/validation")

router.get("/list", currentListingValidation, showList);

module.exports = router;