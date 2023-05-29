const {whitelist} = require("../../../models");

const deleteFromList = async (req,res)=>{
    try {
        const {tokenAddress, networkId} = req.body;
        const list = await whitelist.destroy({where : { tokenAddress, networkId}});
        console.log(list);
        if(list !== 0) res.status(202).json({message:"deleted succesfully"})
        else res.status(202).json({message: "unmatch"})
    } catch (error) {
        res.status(404).json(error);
        console.log(error);
    }
}

module.exports = deleteFromList;
