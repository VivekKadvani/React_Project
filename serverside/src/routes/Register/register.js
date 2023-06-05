const express = require("express");
const router = express.Router()
const ethers = require("ethers");
const jwt = require("jsonwebtoken");
const {loginDetail} = require("../../../models");
const { registrationValidation } = require("../../middleware/validation");


router.post("/", registrationValidation,async (req,res)=>{
    const {signedMessage, messageObj} = req.body;
    const {accountAddress,nounce} = messageObj;
    try {
        const signer = ethers.utils.verifyMessage(JSON.stringify(messageObj),signedMessage);
        if(signer.toLowerCase() === messageObj.accountAddress.toLowerCase()){
            const user = await loginDetail.findOne({where:{user:accountAddress}});
            if(user === null){
                await loginDetail.create({
                    user: accountAddress,
                    nounce,
                });
            }
            else{
                await loginDetail.update({nounce},{where:{user:accountAddress}})
            }
            const token = jwt.sign(messageObj,process.env.SECRET_KEY);
            res.cookie("metamaskToken",token);
            res.send("ok");
        }
        else throw new Error("invalid signature");
    } catch (error) {
        if(error.message === "invalid signature") res.json({error:error.message})
        else res.json({error:error.message})
    }
})

module.exports = router;