const jwt = require("jsonwebtoken")
const {loginDetail} = require("../../models")

const auth = async (req,res,next)=>{

    try {
        if(req.cookies != undefined){
            if(req.cookies.metamaskToken === undefined) throw new Error("cookies not received");
            const token = req.cookies.metamaskToken;
            const data =  jwt.verify(token,process.env.SECRET_KEY);
            const userData = await loginDetail.findOne({where: {user : data.accountAddress, nounce:data.nounce}});
            if(userData == null) throw new Error("not registered");
            next();
        }
        else throw new Error("cookies not received");
    } catch (error) {
        if(error.message === "invalid") res.json({error:error.message})
        else res.json({error:error.message})
    }

}

module.exports = auth