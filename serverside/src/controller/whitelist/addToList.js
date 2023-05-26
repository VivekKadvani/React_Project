const { whitelist } = require("../../../models");

const addToList = async (req, res) => {
  try {
    const { tokenAddress, tokenName, tokenSymbol, networkId } =
      req.body;
    const list = await whitelist.create({
      tokenAddress,
      tokenName,
      tokenSymbol,
      networkId,
    });
    res.status(201).json({
        message : "successfully added",
    })
  } catch (error) {
    res.json(error);
  }
};

module.exports = addToList;
