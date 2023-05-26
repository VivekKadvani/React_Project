const {whitelist} = require("../../../models");

const deleteFromList = async (req,res)=>{
    try {
        const {tokenAddress} = req.body;
        const list = await whitelist.destroy({where : { tokenAddress}});
        console.log(list);
        res.status(202).json({message:"deleted succesfully"})
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = deleteFromList;
