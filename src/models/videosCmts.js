'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class VideosComments extends Model {
      static associate(models) {
         VideosComments.belongsTo(models.Users, { foreignKey: 'userId' });
         VideosComments.belongsTo(models.Videos, { foreignKey: 'videoId' });
      }
   }
   VideosComments.init(
      {
        comment: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        videoId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'VideosComments',
      },
   );
   return VideosComments;
};
