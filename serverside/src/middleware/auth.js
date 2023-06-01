const jwt = require("jsonwebtoken")
const {loginDetail} = require("../../models")

const auth = async (req,res,next)=>{
    
    try {
        if(req.cookies.metamaskToken !== "undefined"){
            const token = req.cookies.metamaskToken;
            const data = await jwt.verify(token,process.env.SECRET_KEY);
            const userData = await loginDetail.findOne({where: {user : data.accountAddress, nounce:data.nounce}});
            console.log(userData)
            next();
        }
        else throw new Error("connect wallet");
    } catch (error) {
        console.log(error);
        res.json(error)
    }
    
}

module.exports = auth