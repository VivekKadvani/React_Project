const {vesting, beneficiary} = require("../../../models")

const locktoken = async (req,res)=>{
    try {
        const {startTime,cliff,slicePeriod,endTime,networkId,tokenAddress,amount,recieveOnInterval,beneficiaryAddress} = req.body;
        console.log(cliff);
        const vestingDataStatus = await vesting.create({
            startTime,cliff,slicePeriod,endTime,networkId,tokenAddress,amount,recieveOnInterval
        })
        const beneficiaryStatus = await beneficiary.create({
            beneficiary : beneficiaryAddress,
            amount,
            networkId,
            vestingId: vestingDataStatus.dataValues.vestingId
        })
        console.log(vestingDataStatus);
        console.log(beneficiaryStatus);
        res.send("successfully created")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports = locktoken;