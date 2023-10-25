'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class VideosLikes extends Model {
      static associate(models) {
         VideosLikes.belongsTo(models.Users, { foreignKey: 'userId' });
         VideosLikes.belongsTo(models.Videos, { foreignKey: 'videoId' });
      }
   }
   VideosLikes.init(
      {
        userId: DataTypes.INTEGER,
        videoId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'VideosLikes',
      },
   );
   return VideosLikes;
};
