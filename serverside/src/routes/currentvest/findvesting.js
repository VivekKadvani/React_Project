const express = require("express");
const showList = require("../../controller/current-vesting/showlist");
const findVesting = require("../../controller/current-vesting/findvesting");
const calculateWithdrawable = require("../../controller/current-vesting/calculateWithrawable");
const withdraw = require("../../controller/current-vesting/withdraw");
const router = express.Router();

router.get("/:id",findVesting);
router.get("/:id/calculateWithdrawable",calculateWithdrawable);
router.post("/:id/withdraw",withdraw);

module.exports = router;