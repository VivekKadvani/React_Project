"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "beneficiaries",
      {
        vestingNo: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        beneficiary: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            is: /^(0x|0X)?[a-fA-F0-9]+$'/,
          },
          default: "0x00",
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        claimed: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        networkId: {
          type: Sequelize.STRING,
          validate: {
            is: /^(0x|0X)?[a-fA-F0-9]+$'/,
          },
          allowNull: false,
        },
        vestingId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references :{
            model:"vestings",
            key:"vestingId",
          }
        }
      },
      {
        timestamps: false,
        Sequelize,
        modelName: "Beneficiary",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("beneficiaries");
  },
};
