"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class whitelist extends Model {
    static associate(models) {
      whitelist.hasMany(models.vesting, {foreignKey: "tokenAddress"})
    }
  }
  whitelist.init(
    {
      listNo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      tokenAddress: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          is: /^(0x|0X)?[a-fA-F0-9]+$'/,
        },
      },
      tokenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenSymbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      networkId: {
        type: DataTypes.STRING,
        validate: {
          is: /^(0x|0X)?[a-fA-F0-9]+$'/,
        },
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "whiteList",
    }
  );
  return whitelist;
};
