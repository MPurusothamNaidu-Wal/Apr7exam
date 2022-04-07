'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExamProducts.belongsTo(models.ExamCategory,{
        foreignKey: 'category',
        onDelete: 'CASCADE',
      })
    }
  }
  ExamProducts.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    inStore: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ExamProducts',
  });
  return ExamProducts;
};