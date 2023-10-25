'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Groups_Roles extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Groups_Roles.init(
      {
         groupId: DataTypes.INTEGER,
         roleId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Groups_Roles',
      },
   );
   return Groups_Roles;
};
