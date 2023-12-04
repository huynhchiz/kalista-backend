'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Chatboxs extends Model {
      static associate(models) {
         Chatboxs.belongsTo(models.Users, { foreignKey: 'userId' });
         Chatboxs.hasMany(models.Messages);
      }
   }
   Chatboxs.init(
      {
         name: DataTypes.STRING,
         userId: DataTypes.INTEGER,
         userId2: DataTypes.INTEGER,
         lastMessageId: DataTypes.INTEGER
      },
      {
         sequelize,
         modelName: 'Chatboxs',
      },
   );
   return Chatboxs;
};
