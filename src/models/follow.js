'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Follow extends Model {
      static associate(models) {
         Follow.belongsTo(models.Users, { foreignKey: 'userId' });
      }
   }
   Follow.init(
      {
         userId: DataTypes.INTEGER,
         userFollowId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Follow',
      },
   );
   return Follow;
};
