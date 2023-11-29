'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Chatboxs extends Model {
      static associate(models) {
         Chatboxs.belongsToMany(models.Users, { through: 'Users_Chatboxs', foreignKey: 'chatboxId' });
         Chatboxs.hasMany(models.Messages);
      }
   }
   Chatboxs.init(
      {
         name: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Chatboxs',
      },
   );
   return Chatboxs;
};
