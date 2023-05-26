"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "whitelists",
      {
        listNo: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        tokenAddress: {
          type: Sequelize.STRING,
          primaryKey: true,
          validate: {
            is: /^(0x|0X)?[a-fA-F0-9]+$'/,
          },
        },
        tokenName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        tokenSymbol: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        networkId: {
          type: Sequelize.STRING,
          validate: {
            is: /^(0x|0X)?[a-fA-F0-9]+$'/,
          },
          allowNull: false,
        },
      },
      {
        timestamps: false,
        Sequelize,
        modelName: "whiteList",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("whitelists");
  },
};
