const express = require("express");
const findVesting = require("../../controller/current-vesting/findvesting");
const calculateWithdrawable = require("../../controller/current-vesting/calculateWithrawable");
const withdraw = require("../../controller/current-vesting/withdraw");
const router = express.Router();

router.get("/",findVesting);
router.get("/:vestingId/calculateWithdrawable",calculateWithdrawable);
router.post("/:vestingId/withdraw",withdraw);

module.exports = router;