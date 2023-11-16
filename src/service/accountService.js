import db from '../models/index.js'
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { createAccessToken, createRefreshToken } from '../middleware/jwtActions.js'

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
const checkEmailExisted = async (email) => {
    let user = await db.Users.findOne({
       where: { email: email },
    });
    return user ? true : false
}
const checkPhoneExisted = async (phone) => {
    let user = await db.Users.findOne({
       where: { phone: phone },
    });
    return user ? true : false
}
const registerSV = async (userData) => {
    try {
      let isEmailExisted = await checkEmailExisted(userData.email);
      if (isEmailExisted) {
         return {
            EM: 'Email is already exist',
            EC: '-2',
            DT: '',
         };
      }
      let isPhoneExisted = await checkPhoneExisted(userData.phone);
      if (isPhoneExisted) {
         return {
            EM: 'Phone number is already exist',
            EC: '-3',
            DT: '',
         };
      }

      let hassPass = hashPassword(userData.password);
      await db.Users.create({
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        password: hassPass,
        groupId: 2, //mac dinh user = 2
      });

     return {
        EM: 'User is created successfully',
        EC: '0',
        DT: '',
     };
    } catch (error) {
        console.log('registerUser service err: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
         };   
    }
}

const getUserGroupWithRoles = async (user) => {
   let group = await db.Groups.findOne({
      where: { id: +user.groupId },
      attributes: ['id', 'name', 'description'],
      raw: true,
   });

   let roles = await db.Roles.findAll({
      attributes: ['id', 'url', 'description'],
      include: { model: db.Groups, where: { id: +user.groupId }, attributes: [], through: { attributes: [] } },
      throught: { attributes: [] },
      raw: true,
      nest: true,
   });
   
   return group && roles ? { ...group, roles } : {};
}
const checkPassword = (inputPassword, hashPassword) => {
   return bcrypt.compareSync(inputPassword, hashPassword);
}
const loginSV = async (userData) => {
   try {
      let user = await db.Users.findOne({
         where: {
            [Op.or]: [{ email: userData.loginValue }, { phone: userData.loginValue }],
         },
      });

      if(user) {
         let isCorrectPassword = checkPassword(userData.password, user.password)
         if(isCorrectPassword) {
            console.log('Correct password');

            let userGroupWithRoles = await getUserGroupWithRoles(user)
            let payload = {
               userId: user.id,
               email: user.email,
               username: user.username,
               userGroupWithRoles,
            }
            let accessToken = createAccessToken(payload)
            let refreshToken = createRefreshToken(payload)
            
            return {
               accessToken,
               refreshToken,
               EM: 'Correct password / success login',
               EC: '0',
               DT: {
                  accessToken,
                  refreshToken,
                  userGroupWithRoles,
                  email: user.email,
                  phone: user.phone,
                  username: user.username,
                  userId: user.id
               }
            }
         } else {
            console.log('Incorrect password');
            return {
               EM: 'Incorrect password',
               EC: '-1',
               DT: '',
            }
         }

      } else {
         console.log('Incorrect email / phone');
         return {
            EM: 'Incorrect email / phone',
            EC: '-1',
            DT: '',
         }
      }

   } catch (error) {
      console.log('loginUser service err: ', error);
      return {
         EM: 'Something wrong in service',
         EC: '-5',
         DT: '',
      }; 
   }
}

const getInfoSV = async (userId) => {
   let user = await db.Users.findOne({
      where: { id: +userId },
      attributes: ['email', 'avatar', 'address', 'id', 'phone', 'username'],
      raw: true,
  })

  let countFollower = await db.Follows.count({ where: { userToFollow: +user.id } })
  let countFollowing = await db.Follows.count({ where: { follower: +user.id } })
  let countPost = await db.Posts.count({ where: { userId: +user.id } })

  return {
      ...user,
      countFollower,
      countFollowing,
      countPost
  }
}

const uploadAvatarSV = async (userId, avatar) =>  {
   await db.Users.update({
      avatar: avatar
  },
  {
      where: { id: +userId }
  })
  return avatar
}

const getAvatarSV = async (userId) =>  {
   let data = await db.Users.findOne({
      where: { id: +userId },
      attributes: ['avatar']
  })
  return data
}

const deleteAvatarSV = async (userId) => {
   await db.Users.update({
      avatar: ''
  },
  {
      where: { id: +userId }
  })
  return userId
}

const followSV = async (userId, userFollowId) =>  {

   // tim ra nhung user minh dang follow
   let usersAlreadyFollowing = await db.Follows.findAll({
      where: { follower: +userId },
      raw: true,
      attributes: [ 'userToFollow' ]
   })
   let followingIds = usersAlreadyFollowing.map(item => (item.userToFollow)) // chi lay id
   if (followingIds.includes(userFollowId)) {
      return -1 // user is already following
   }

   await db.Follows.create({
      follower: +userId,
      userToFollow: +userFollowId
   })

   return userFollowId
}

const unfollowSV = async (userId, userUnfollowId) => {
   // tim ra nhung user minh dang follow
   let usersAlreadyFollowing = await db.Follows.findAll({
      where: { follower: +userId },
      raw: true,
      attributes: [ 'userToFollow' ]
   })
   let followingIds = usersAlreadyFollowing.map(item => (item.userToFollow)) // chi lay id
   if (followingIds.includes(userUnfollowId)) {
      await db.Follows.destroy({
         where: {
            follower: +userId,
            userToFollow: +userUnfollowId
         }
      })
      return userUnfollowId
   }
   return -1 // user is not follow yet
}

const getFollowersSV = async (userId, limit) => {
   let user = await db.Users.findOne({ where: { id: +userId } })
   let followersListId = await db.Follows.findAll({
      where: { userToFollow: +user.id },
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
   let user = await db.Users.findOne({ where: { id: +userId } })
   let followingListId = await db.Follows.findAll({
       where: { follower: +user.id },
       attributes: [ 'userToFollow' ],
       raw: true,
   })
   followingListId = followingListId.map(item => (item.userToFollow))

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

const getPostsSV = async (userId, limit) => {
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
         where: { postId: +post.id, userId: +userId },
         attributes: [ 'userId' ],
         raw: true
      })

      if (likePost && +likePost.userId === +userId) {
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

module.exports = {
   registerSV,
   loginSV,
   getUserGroupWithRoles,
   getInfoSV,
   uploadAvatarSV,
   getAvatarSV,
   deleteAvatarSV,
   followSV,
   unfollowSV,
   getFollowersSV,
   getFollowingsSV,
   getPostsSV
}