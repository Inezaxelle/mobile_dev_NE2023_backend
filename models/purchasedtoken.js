'use strict';
const { Model } = require('sequelize'); // Correct import of Model from Sequelize

module.exports = (sequelize, DataTypes) => {
  class PurchasedToken extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  PurchasedToken.init({
    meter_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 6] // Only accept exactly 6 characters
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 8] // Only accept exactly 8 characters
      }
    },
    token_status: {
      type: DataTypes.ENUM('NEW', 'USED', 'EXPIRED'),
      allowNull: false
    },
    token_value_days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchased_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PurchasedToken',
  });

  return PurchasedToken;
};
