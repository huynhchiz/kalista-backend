'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Users extends Model {
      static associate(models) {
         // define association here
         Users.belongsTo(models.Groups, { foreignKey: 'groupId' });
         Users.belongsTo(models.Genders, { foreignKey: 'genderId' });
         Users.belongsTo(models.Themes, { foreignKey: 'themeId' });

         Users.hasMany(models.Images);
         Users.hasMany(models.Videos);
         Users.hasMany(models.Follow);
         Users.hasMany(models.ImagesComments);
         Users.hasMany(models.VideosComments);
         Users.hasMany(models.ImagesLikes);
         Users.hasMany(models.VideosLikes);
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
