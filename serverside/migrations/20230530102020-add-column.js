'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('whitelists', 'decimals', {
      type: Sequelize.INTEGER, // Specify the data type of the new column
      allowNull: true, // Set to false if the column should not allow null values
      defaultValue: 18, // Set a default value for the column (optional)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('whitelists', 'decimals');
  }
};
