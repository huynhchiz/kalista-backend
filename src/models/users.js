'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Users extends Model {
      static associate(models) {
         // define association here
         Users.belongsTo(models.Groups, { foreignKey: 'groupId' });
         Users.belongsTo(models.Genders, { foreignKey: 'genderId' });

         Users.hasMany(models.Followers);
         Users.hasMany(models.Followings);
         Users.hasMany(models.Posts);
         Users.hasMany(models.PostsComments);
         Users.hasMany(models.PostsLikes);
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
      },
      {
         sequelize,
         modelName: 'Users',
      },
   );
   return Users;
};
