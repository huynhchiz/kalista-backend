import { Op, Sequelize } from 'sequelize'
import db from '../models/index'

const getInfoSV = async (accountId, userId) => {
    let user = await db.Users.findOne({
        where: { id: +userId },
        attributes: ['email', 'avatar', 'address', 'id', 'phone', 'username'],
        raw: true,
    })
    let isFollowing = await db.Followings.count({
        where: { userId: +accountId, following: +userId },
    })
    let countFollower = await db.Followers.count({ where: { userId: +userId } })
    let countFollowing = await db.Followings.count({ where: { userId: +userId } })
    let countPost = await db.Posts.count({ where: { userId: +userId } })    

    return {
        ...user,
        countFollower,
        countFollowing,
        countPost,
        isFollowing: isFollowing >= 1 ? true : false
    }
}

const getUserPostsSV = async (accountId, userId, limit) => {
    const { count, rows } = await db.Posts.findAndCountAll({
        where: { userId: +userId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },
        raw: true, 
        nest: true,
        limit: +limit,
        order: [['updatedAt', 'DESC']]
     })
  
     let posts = await Promise.all(rows.map(async (post) => {
        let countLike = await db.PostsLikes.count({
           where: { postId: +post.id }
        })
        let countComment = await db.PostsComments.count({
           where: { postId: +post.id }
        })
  
        let likePost = await db.PostsLikes.findOne({
           where: { postId: +post.id, userId: +accountId },
           attributes: [ 'userId' ],
           raw: true
        })
  
        if (likePost && +likePost.userId === +accountId) {
           return (
              {...post, countLike, countComment, liked: true}
           )
        } 
        return (
           {...post, countLike, countComment, liked: false}
        )
     }))
  
     return {
        list: posts,
        count: count
     }
}

const getFollowersSV = async (userId, limit) => {
   let followersListId = await db.Followers.findAll({
      where: { userId: +userId },
      attributes: [ 'follower' ],
      raw: true,
   })
   followersListId = followersListId.map(item => (item.follower))

   let data = {}
   const { count, rows } = await db.Users.findAndCountAll({
      where: { id: followersListId },
      raw: true,
      limit: +limit
   })
   data = {
      countFollower: count || 0,
      listFollower: rows
   }
   return data
}

const getFollowingsSV = async (userId, limit) => {
   let followingListId = await db.Followings.findAll({
       where: { userId: +userId },
       attributes: [ 'following' ],
       raw: true,
   })
   followingListId = followingListId.map(item => (item.following))

   let data = {}
   const { count, rows } = await db.Users.findAndCountAll({
      where: { id: followingListId },
      raw: true,
      limit: +limit
   })
   data = {
       countFollowing: count || 0,
       listFollowing: rows
   }
   return data
}

const searchUsersSV = async (searchValue, limit) => {
   let users = await db.Users.findAll({
      where: { username: {[Op.like]: '%' + searchValue + '%' }},
      subQuery: false,
      attributes: { include: [
            [Sequelize.fn('COUNT', Sequelize.col('followers.id')), 'countFollower'],
      ]},
      include: [
         { model: db.Followers, attributes: []},
      ],
      group: ['Users.id'],
      limit: +limit,
      raw: true,
      order: [['countFollower', 'DESC']]
   })
   
   users = await Promise.all(users.map(async (user) => {
      let countFollowing = await db.Followings.count({ where: { userId: +user.id } })
      let countPost = await db.Posts.count({ where: { userId: +user.id } })

      return {
         id: user.id,
         avatar: user.avatar,
         email: user.email,
         countFollower: user.countFollower,
         countFollowing: countFollowing,
         countPost: countPost,
      }
   }))
   
   return users
}


module.exports = {
   getInfoSV,
   getUserPostsSV,
   getFollowingsSV,
   getFollowersSV,
   searchUsersSV,
}