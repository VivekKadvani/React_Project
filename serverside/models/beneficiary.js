"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class beneficiary extends Model {
    static associate(models) {
      beneficiary.belongsTo(models.vesting, {foreignKey:"vestingId"})
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
        allowNull: false,
      },
      vestingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references :{
          model:"vestings",
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
