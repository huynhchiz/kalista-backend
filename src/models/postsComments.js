'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class PostsComments extends Model {
      static associate(models) {
         PostsComments.belongsTo(models.Users, { foreignKey: 'userComment' });
         PostsComments.belongsTo(models.Posts, { foreignKey: 'postId' });
      }
   }
   PostsComments.init(
      {
        comment: DataTypes.STRING,
        userComment: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'PostsComments',
      },
   );
   return PostsComments;
};
