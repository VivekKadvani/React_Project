
const {beneficiary,vesting} = require("../../../models")

const updateClaimed = async(req,res)=>{
    try {
        const {vestinId, claimed} = req.body;
        console.log(req.body);
        const beneficiaryData = await beneficiary.update({claimed:claimed/(10**18)}, {where:{vestingId}});
        const vestings = await vesting.findOne({where:{vestinId}})
        console.log(await vestings.getWhitelist());
        console.log(beneficiaryData);
        res.json("done")
    } catch (error) {
        res.json(error)
    }
}

module.exports = updateClaimed