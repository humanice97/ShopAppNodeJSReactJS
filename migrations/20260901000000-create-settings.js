'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true
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

    // Seed du lieu mac dinh cho gio lam viec
    await queryInterface.bulkInsert('settings', [
      {
        key: 'weekday_label',
        value: 'Thu 2 - Thu 7',
        description: 'Nhan ngay trong tuan hien thi tren trang chu',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'weekday_hours',
        value: '08:00 - 20:00',
        description: 'Gio mo cua thu 2 den thu 7',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'sunday_label',
        value: 'Chu nhat',
        description: 'Nhan chu nhat hien thi tren trang chu',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'sunday_hours',
        value: '09:00 - 20:00',
        description: 'Gio mo cua chu nhat',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'footer_hours',
        value: '08:00 - 21:30 (Tat ca cac ngay)',
        description: 'Chuoi gio hien thi o footer',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};
