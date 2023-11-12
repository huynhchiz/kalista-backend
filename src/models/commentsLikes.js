'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class CommentsLikes extends Model {
      static associate(models) {
         CommentsLikes.belongsTo(models.PostsComments, { foreignKey: 'postsCommentId' });
         CommentsLikes.belongsTo(models.Users, { foreignKey: 'userId' });
      }
   }
   CommentsLikes.init(
      {
        userId: DataTypes.INTEGER,
        postsCommentId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'CommentsLikes',
      },
   );
   return CommentsLikes;
};
