"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loginDetail extends Model {
    static associate(models) {
    }
  }
  loginDetail.init(
    {
        user: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
          },
          nounce: {
            type: Sequelize.DECIMAL(100,20),
          }
    },
    {
      timestamps: false,
      sequelize,
      modelName: "loginDetail",
    }
  );
  return loginDetail;
};
