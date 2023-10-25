'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Groups extends Model {
      static associate(models) {
         Groups.hasMany(models.Users);
         Groups.belongsToMany(models.Roles, { through: 'Groups_Roles', foreignKey: 'groupId' });
      }
   }
   Groups.init(
      {
         name: DataTypes.STRING,
         description: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Groups',
      },
   );
   return Groups;
};
