'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Followers extends Model {
      static associate(models) {
         Followers.belongsTo(models.Users, { foreignKey: 'userId' });
      }
   }
   Followers.init(
      {
         userId: DataTypes.INTEGER,
         follower: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Followers',
      },
   );
   return Followers;
};
