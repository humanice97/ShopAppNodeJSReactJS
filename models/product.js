'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, {
        foreignKey: 'brand_id'
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id'
      })
      Product.hasMany(models.OrderDetail, {
        foreignKey: 'product_id'
      })
      Product.hasMany(models.BannerDetail, {
        foreignKey: 'product_id'
      })
      Product.hasMany(models.FeedBack, {
        foreignKey: 'product_id'
      })
      Product.hasMany(models.NewsDetail, {
        foreignKey: 'product_id'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    old_price: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    specification: DataTypes.TEXT,
    buy_turn: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    underscored: true
  });
  return Product;
};