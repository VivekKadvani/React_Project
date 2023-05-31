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
        type: Sequelize.INTEGER,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('loginDetails');
  }
};
