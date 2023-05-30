const { beneficiary } = require("../../../models");

const showList = async (req, res) => {
    try {
        const { beneficiaryAddress, networkId } = req.query;
        const beneficiaryData = await beneficiary.findAll(
            {
                where:
                {
                    beneficiary: beneficiaryAddress,
                    networkId
                }
            });

        res.json({ data: beneficiaryData});

    } catch (error) {
        res.json(error);
    }
}

module.exports = showList