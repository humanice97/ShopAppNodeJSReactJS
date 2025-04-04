'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeedBack.belongsTo(models.User,{
        foreignKey: 'user_id'
      })
      FeedBack.belongsTo(models.Product,{
        foreignKey: 'product_id'
      })
    }
  }
  FeedBack.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    star: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'FeedBack',
    tableName:'feed_backs',
    underscored: true
  });
  return FeedBack;
};