"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class beneficiary extends Model {
    static associate(models) {
      beneficiary.belongsToMany(models.vesting, {foreignKey:"vestingId", through:"beneficiarybelongstovesting"})
    }
  }
  beneficiary.init(
    {
      vestingNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      beneficiary: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        validate: {
          is: /^(0x|0X)?[a-fA-F0-9]+$'/,
        },
        allowNull: false,
      },
      vestingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references :{
          model:"vesting",
          key:"vestingId",
        }
      }
    },
    {
      timestamps: false,
      sequelize,
      modelName: "beneficiary",
    }
  );
  return beneficiary;
};
