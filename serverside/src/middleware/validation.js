const Joi = require("joi");

const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/; //  wallet address pattern
const networkIdRegex = /^(0x)?[0-9a-fA-F]{4}$/; // network ID pattern

const lockingValidation = (req,res,next)=>{
    const schema = Joi.object({
        startTime:Joi.number().integer().positive().required().optional(),
        cliff: Joi.number().integer().positive().required(),
        slicePeriod: Joi.number().integer().positive().required(),
        endTime: Joi.number().integer().positive().required(),
        networkId: Joi.string().required(),
        tokenAddress: Joi.string().regex(addressRegex).required(),
        amount: Joi.number().positive().required(),
        recieveOnInterval: Joi.number().positive().required(),
        beneficiaryAddress: Joi.string().regex(addressRegex).required()
      }).unknown(true);

    const {error} = schema.validate(req.body, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();

}

const whitelistingValidation = (req,res,next)=>{
    const schema = Joi.object({
        networkId: Joi.string().required()
    }).unknown(true);

    const {error} = schema.validate(req.query, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();
}

const deleFromListValidation = (req,res,next)=>{
    const schema = Joi.object({
        tokenAddress: Joi.string().regex(addressRegex).required(),
        networkId: Joi.string().required()
    }).unknown(true);

    const {error} = schema.validate(req.body, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();
}

const addToListValidation = (req,res,next)=>{
    const schema = Joi.object({
        tokenAddress: Joi.string().regex(addressRegex).required(),
        tokenName: Joi.string().required(),
        tokenSymbol: Joi.string().required(),
        networkId: Joi.string().required(),
        decimals: Joi.number().integer().positive().required()
    }).unknown(true);

    const {error} = schema.validate(req.body, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();

}

const findVestingValidation = (req,res,next)=>{
    const schema = Joi.object({
        vestingId : Joi.number().integer().positive().required(),
        beneficiaryAddress: Joi.string().regex(addressRegex).required()
    }).unknown(true);

    const {error} = schema.validate(req.query, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();
}

const currentListingValidation = (req,res,next)=>{
    const schema = Joi.object({
        beneficiaryAddress: Joi.string().regex(addressRegex).required(),
        networkId: Joi.string().required(),
    }).unknown(true);

    const {error} = schema.validate(req.query, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();
}

const updateClaimedValidation = (req,res,next)=>{
    const schema = Joi.object({
        vestingId: Joi.number().positive().required(),
        claimed: Joi.number().positive().required(),
    }).unknown(true);
    const {vestingId, claimed} = req.body;
    const {error} = schema.validate({vestingId, claimed:claimed/10**18}, { aboutEarly:true });
    if(error){
        const {details} = error;
        res.json({error: details});
    }
    else next();
}

module.exports = {
    lockingValidation,
    whitelistingValidation,
    deleFromListValidation,
    addToListValidation,
    findVestingValidation,
    currentListingValidation,
    updateClaimedValidation
}