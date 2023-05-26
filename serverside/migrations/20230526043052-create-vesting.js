"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "vestings",
      {
        vestingId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        locked: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        startTime: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        cliff: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        slicePeriod: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        endTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        networkId: {
          type: Sequelize.STRING,
          validate: {
            is: /^(0x|0X)?[a-fA-F0-9]+$'/,
          },
          allowNull: false,
        },
        tokenAddress: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            is: /^(0x|0X)?[a-fA-F0-9]+$'/,
          },
          references:{
            model:"whitelists",
            key:"tokenAddress"
          }
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        recieveOnInterval: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        Sequelize,
        modelName: "vesting",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vestings");
  },
};
