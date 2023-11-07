'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Follows extends Model {
      static associate(models) {
         Follows.belongsTo(models.Users, { foreignKey: 'userToFollow' });
      }
   }
   Follows.init(
      {
         userToFollow: DataTypes.INTEGER,
         follower: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Follows',
      },
   );
   return Follows;
};
