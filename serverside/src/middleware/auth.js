const jwt = require("jsonwebtoken")
const {loginDetail} = require("../../models")

const auth = async (req,res,next)=>{

    try {
        console.log(req.cookies.metamaskToken);
        if(req.cookies != undefined){
            console.log("inner");
            if(req.cookies.metamaskToken === undefined) throw new Error("invalid");
            const token = req.cookies.metamaskToken;
            const data =  jwt.verify(token,process.env.SECRET_KEY);
            const userData = await loginDetail.findOne({where: {user : data.accountAddress, nounce:data.nounce}});
            if(userData == null) throw new Error("invalid");
            next();
        }
        else throw new Error("invalid");
    } catch (error) {
        if(error.message === "invalid") res.json({error:error.message})
        else res.json({error:error.message})
    }

}

module.exports = auth