'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Videos extends Model {
      static associate(models) {
         Videos.belongsTo(models.Users, { foreignKey: 'userId' });

         Videos.hasMany(models.VideosLikes, { foreignKey: 'videoLikeId' });
         Videos.hasMany(models.VideosComments, { foreignKey: 'videoCommentId' });
      }
   }
   Videos.init(
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
         modelName: 'Videos',
      },
   );
   return Videos;
};
