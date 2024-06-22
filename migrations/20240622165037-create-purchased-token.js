'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PurchasedTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meter_number: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      token_status: {
        type: Sequelize.ENUM('NEW', 'USED', 'EXPIRED'),
      },
      token_value_days: {
        type: Sequelize.INTEGER
      },
      purchased_date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PurchasedTokens');
  }
};