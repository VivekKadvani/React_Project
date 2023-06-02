const express = require("express");
const addToList = require("../../controller/whitelist/addToList");
const deleteFromList = require("../../controller/whitelist/deleteFromList");
const router = express.Router();
const {
    addToListValidation
} = require("../../middleware/validation")

router.post("/addtolist", addToListValidation, addToList);
router.post("/deletefromlist",deleteFromList);

module.exports = router;