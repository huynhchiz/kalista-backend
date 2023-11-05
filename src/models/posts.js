'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Posts extends Model {
      static associate(models) {
         Posts.belongsTo(models.Users, { foreignKey: 'userId' });

         Posts.hasMany(models.PostsLikes, { foreignKey: 'postLikeId' });
         Posts.hasMany(models.PostsComments, { foreignKey: 'postCommentId' });
      }
   }
   Posts.init(
      {
         src: DataTypes.STRING,
         alt: DataTypes.STRING,
         caption: DataTypes.STRING,
         time: DataTypes.STRING,
         date: DataTypes.STRING,
         type: DataTypes.STRING,
         userId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: 'Posts',
      },
   );
   return Posts;
};
