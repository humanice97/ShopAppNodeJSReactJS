'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    static associate(models) {
      // no associations
    }
  }
  Setting.init({
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
    underscored: true
  });
  return Setting;
};
