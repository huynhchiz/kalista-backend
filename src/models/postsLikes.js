'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class PostsLikes extends Model {
      static associate(models) {
         PostsLikes.belongsTo(models.Posts, { foreignKey: 'postId' });
         PostsLikes.belongsTo(models.Users, { foreignKey: 'userLike' });
      }
   }
   PostsLikes.init(
      {
        postId: DataTypes.INTEGER,
        userLike: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'PostsLikes',
      },
   );
   return PostsLikes;
};
