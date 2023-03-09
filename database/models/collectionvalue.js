'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collectionValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      collectionValue.belongsTo(models.contentType, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
      });
    }
  }
  collectionValue.init({
    contentId: DataTypes.INTEGER,
    instanceValues: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'collectionValue',
  });
  return collectionValue;
};