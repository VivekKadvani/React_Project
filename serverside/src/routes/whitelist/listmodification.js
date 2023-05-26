const express = require("express");
const addToList = require("../../controller/whitelist/addToList");
const deleteFromList = require("../../controller/whitelist/deleteFromList");
const router = express.Router();

router.post("/addtolist",addToList);
router.post("/deletefromlist",deleteFromList);

module.exports = router;