const { whitelist } = require("../../../models");

const showlist = async (req, res) => {
  try {
    const { networkId } = req.query;
    const list = await whitelist.findAll({
      where: { networkId },
      order: [["listNo", "ASC"]],
    });
    res.json(list);
  } catch (error) {
    res.json(error);
  }
};

module.exports = showlist;
