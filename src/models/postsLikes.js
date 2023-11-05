'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class PostsLikes extends Model {
      static associate(models) {
         PostsLikes.belongsTo(models.Users, { foreignKey: 'userId' });
         PostsLikes.belongsTo(models.Posts, { foreignKey: 'postId' });
      }
   }
   PostsLikes.init(
      {
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'PostsLikes',
      },
   );
   return PostsLikes;
};
