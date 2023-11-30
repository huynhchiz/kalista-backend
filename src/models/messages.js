'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Messages extends Model {
      static associate(models) {
         Messages.belongsTo(models.Chatboxs, { foreignKey: 'chatboxId' });
         Messages.belongsTo(models.Users, { foreignKey: 'userId' });
      }
   }
   Messages.init(
      {
        type: DataTypes.STRING,
        message: DataTypes.STRING,
        src: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        chatboxId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Messages',
      },
   );
   return Messages;
};
