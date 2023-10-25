'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Roles extends Model {
      static associate(models) {
         Roles.belongsToMany(models.Groups, { through: 'Groups_Roles', foreignKey: 'roleId' });
      }
   }
   Roles.init(
      {
         url: DataTypes.STRING,
         description: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Roles',
      },
   );
   return Roles;
};
