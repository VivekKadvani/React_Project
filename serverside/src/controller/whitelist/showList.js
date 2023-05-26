const showlist = (req,res)=>{
    const {networkId} = req.query;
    console.log(networkId);
    res.send(" working ....")
}

module.exports = showlist;