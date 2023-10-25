'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class ImagesLikes extends Model {
      static associate(models) {
         ImagesLikes.belongsTo(models.Users, { foreignKey: 'userId' });
         ImagesLikes.belongsTo(models.Images, { foreignKey: 'imageId' });
      }
   }
   ImagesLikes.init(
      {
        userId: DataTypes.INTEGER,
        imageId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'ImagesLikes',
      },
   );
   return ImagesLikes;
};
