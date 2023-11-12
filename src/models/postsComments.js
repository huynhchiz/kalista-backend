'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class PostsComments extends Model {
      static associate(models) {
         PostsComments.belongsTo(models.Posts, { foreignKey: 'postId' });
         PostsComments.belongsTo(models.Users, { foreignKey: 'userId' });
         PostsComments.hasMany(models.CommentsLikes);
      }
   }
   PostsComments.init(
      {
        comment: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'PostsComments',
      },
   );
   return PostsComments;
};
