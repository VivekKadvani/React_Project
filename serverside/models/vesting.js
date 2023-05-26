"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vesting extends Model {
    static associate(models) {
      vesting.hasMany(models.beneficiary, {foreignKey:"vestingId"});
      vesting.belongsTo(models.whitelist, {foreignKey : "tokenAddress"});
    }
  }
  vesting.init(
    {
      vestingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      startTime: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      cliff: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      slicePeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      networkId: {
        type: DataTypes.STRING,
        validate: {
          is: /^(0x|0X)?[a-fA-F0-9]+$'/,
        },
        allowNull: false,
      },
      tokenAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(0x|0X)?[a-fA-F0-9]+$'/,
        },
        references:{
          model:"whitelist",
          key:"tokenAddress"
        }
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recieveOnInterval: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "vesting",
    }
  );
  return vesting;
};
