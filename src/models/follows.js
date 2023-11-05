'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Follows extends Model {
      static associate(models) {
         Follows.belongsTo(models.Users, { foreignKey: 'userId' });
      }
   }
   Follows.init(
      {
         userId: DataTypes.INTEGER,
         userFollowId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Follows',
      },
   );
   return Follows;
};
