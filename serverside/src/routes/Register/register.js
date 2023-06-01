const express = require("express");
const router = express.Router()
const ethers = require("ethers");
const jwt = require("jsonwebtoken");
const {loginDetail} = require("../../../models");


router.post("/",async (req,res)=>{
    const {signedMessage, messageObj} = req.body;
    console.log(req.body);
    try {
        const signer = ethers.utils.verifyMessage(JSON.stringify(messageObj),signedMessage);
        if(signer.toLowerCase() === messageObj.accountAddress.toLowerCase()){
            const userData = await loginDetail.create({
                user: messageObj.accountAddress,
                nounce : messageObj.nounce
            });
            const token = await jwt.sign(messageObj,process.env.SECRET_KEY);
            res.cookie("metamaskToken",token)
            res.send("ok");
        }
        else throw new Error("invalid signature");
    } catch (error) {
        console.log(error);
        if(error.message.includes(`duplicate key value violates unique constraint "loginDetails_pkey"`)){

        }
        res.send(error)
    }
})

module.exports = router;