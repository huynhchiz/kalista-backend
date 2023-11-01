'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Images extends Model {
      static associate(models) {
         Images.belongsTo(models.Users, { foreignKey: 'userId' });

         Images.hasMany(models.ImagesLikes, { foreignKey: 'imageLikeId' });
         Images.hasMany(models.ImagesComments, { foreignKey: 'imageCommentId' });
      }
   }
   Images.init(
      {
         src: DataTypes.STRING,
         alt: DataTypes.STRING,
         caption: DataTypes.STRING,
         time: DataTypes.STRING,
         date: DataTypes.STRING,
         userId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Images',
      },
   );
   return Images;
};
