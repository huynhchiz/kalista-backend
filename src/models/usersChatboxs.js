'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Users_Chatboxs extends Model {
      static associate(models) {
         
      }
   }
   Users_Chatboxs.init(
      {
         userId: DataTypes.INTEGER,
         userId2: DataTypes.INTEGER,
         chatboxId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Users_Chatboxs',
      },
   );
   return Users_Chatboxs;
};
