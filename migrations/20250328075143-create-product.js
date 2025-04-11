'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        unique: true,
        type: Sequelize.STRING
      },
      price: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      old_price: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      specification: {
        type: Sequelize.TEXT
      },
      buy_turn: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      quantity: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'id',
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.sequelize.query(`
      ALTER TABLE products
      ADD CONSTRAINT chk_price CHECK (price >= 0),
      ADD CONSTRAINT chk_old_price CHECK (old_price >= 0),
      ADD CONSTRAINT chk_quantity CHECK (quantity >= 0),
      ADD CONSTRAINT chk_buy_turn CHECK (buy_turn >= 0)
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};