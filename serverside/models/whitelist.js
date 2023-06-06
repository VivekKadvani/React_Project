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
      },
      tokenAddress: {
        type: DataTypes.STRING,
        primaryKey: true,
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
        allowNull: false,
      },
      decimals:{
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 18,
        }
    },
    {
      timestamps: false,
      sequelize,
      modelName: "whitelist",
    }
  );
  return whitelist;
};
