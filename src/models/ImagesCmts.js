'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class ImagesComments extends Model {
      static associate(models) {
         ImagesComments.belongsTo(models.Users, { foreignKey: 'userId' });
         ImagesComments.belongsTo(models.Images, { foreignKey: 'imageId' });
      }
   }
   ImagesComments.init(
      {
        comment: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        imageId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'ImagesComments',
      },
   );
   return ImagesComments;
};
