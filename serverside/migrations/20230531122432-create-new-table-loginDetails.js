'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loginDetails', {
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nounce: {
        type: Sequelize.DECIMAL(100,20),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('loginDetails');
  }
};
