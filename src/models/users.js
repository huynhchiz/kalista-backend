'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Users extends Model {
      static associate(models) {
         // define association here
         Users.belongsTo(models.Groups, { foreignKey: 'groupId' });
         Users.belongsTo(models.Genders, { foreignKey: 'genderId' });
         Users.belongsTo(models.Themes, { foreignKey: 'themeId' });

         Users.hasMany(models.Images, { foreignKey: 'imageId' });
         Users.hasMany(models.Videos, { foreignKey: 'videoId' });
         Users.hasMany(models.Follow, { foreignKey: 'followId' });
         Users.hasMany(models.ImgComments, { foreignKey: 'imgCommentId' });
         Users.hasMany(models.VideoComments, { foreignKey: 'videoCommentId' });
         Users.hasMany(models.ImageLikes, { foreignKey: 'imageLikeId' });
         Users.hasMany(models.VideoLikes, { foreignKey: 'videoLikeId' });
      }
   }
   Users.init(
      {
         email: DataTypes.STRING,
         phone: DataTypes.STRING,
         password: DataTypes.STRING,
         username: DataTypes.STRING,
         address: DataTypes.STRING,
         avatar: DataTypes.STRING,
         groupId: DataTypes.INTEGER,
         genderId: DataTypes.INTEGER,
         themeId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Users',
      },
   );
   return Users;
};
