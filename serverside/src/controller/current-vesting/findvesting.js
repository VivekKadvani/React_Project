const { vesting, beneficiary} = require("../../../models");


const findVesting = async (req,res) =>{
    try {
        const {vestingId,beneficiaryAddress} = req.query;
        const beneficiaryData = await beneficiary.findOne({
            where:{
                beneficiary: beneficiaryAddress,
                vestingId,
            }
        })
        const vestingSchedule = await vesting.findOne({
            where: { vestingId }
        });

        res.json(
            {
                data : {
                    ...vestingSchedule.dataValues,
                    claimed:beneficiaryData.claimed,
                    beneficiary:beneficiaryAddress
                }
            })
    } catch (error) {
        res.json(error)
    }
}

module.exports = findVesting;