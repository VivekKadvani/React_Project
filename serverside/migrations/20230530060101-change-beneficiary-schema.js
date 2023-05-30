module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('beneficiaries', 'amount', {
      type: Sequelize.DECIMAL(38, 18),
      allowNull: false,
    });

    await queryInterface.changeColumn('beneficiaries', 'claimed', {
      type: Sequelize.DECIMAL(38, 18),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('beneficiaries', 'amount', {
      type: Sequelize.DataTypes.INTEGER, // Restore the original data type if needed
      allowNull: false,
    });

    await queryInterface.changeColumn('beneficiaries', 'claimed', {
      type: Sequelize.DataTypes.INTEGER, // Restore the original data type if needed
      allowNull: false,
    });
  },
};