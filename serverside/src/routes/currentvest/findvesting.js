const express = require("express");
const findVesting = require("../../controller/current-vesting/findvesting");
const updateClaimed = require("../../controller/current-vesting/updateClaimed");
const router = express.Router();
const {
    findVestingValidation, updateClaimedValidation
} = require("../../middleware/validation")

router.get("/", findVestingValidation, findVesting);
router.put("/updateclaiming",updateClaimedValidation,updateClaimed)

module.exports = router;