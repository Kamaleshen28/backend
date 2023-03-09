'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contentType.hasMany(models.collectionValue, {
        foreignKey: 'contentId',
      });
    }
  }
  contentType.init({
    contentName: {
      type: DataTypes.STRING,
      unique: true
    },
    contentSchema: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'contentType',
  });
  return contentType;
};