const {vesting} = require("../../../models")

const locktoken = async (req,res)=>{
    try {
        const {startTime,cliff,slicePeriod,endTime,networkId,tokenAddress,amount,recieveOnInterval} = req.body;
        console.log(cliff);
        const vestingData = await vesting.create({
            startTime,cliff,slicePeriod,endTime,networkId,tokenAddress,amount,recieveOnInterval
        })
        console.log(vestingData);
        res.send("successfully created")
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports = locktoken;