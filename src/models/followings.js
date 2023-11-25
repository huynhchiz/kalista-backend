'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Followings extends Model {
      static associate(models) {
         Followings.belongsTo(models.Users, { foreignKey: 'userId' });
      }
   }
   Followings.init(
      {
         userId: DataTypes.INTEGER,
         following: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Followings',
      },
   );
   return Followings;
};
