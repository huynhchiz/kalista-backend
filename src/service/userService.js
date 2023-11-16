import db from '../models/index'

const getInfoSV = async (accountId, userId) => {
    let user = await db.Users.findOne({
        where: { id: +userId },
        attributes: ['email', 'avatar', 'address', 'id', 'phone', 'username'],
        raw: true,
    })
    let isFollowing = await db.Follows.count({
        where: { userToFollow: +userId, follower: accountId },
    })
    let countFollower = await db.Follows.count({ where: { userToFollow: +userId } })
    let countFollowing = await db.Follows.count({ where: { follower: +userId } })
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

// const uploadUserAvatar = async (email, avatar) => {
//     try {
//         await db.Users.update({
//             avatar: avatar
//         },
//         {
//             where: { email: email }
//         })
//         return {
//             EC: 0,
//             EM: 'Upload avatar success',
//             DT: '',
//         }
//     } catch (error) {
//         console.log('uploadUserAvatar sv err: ', error);
//         return {
//             EM: 'Something wrong in service',
//             EC: '-5',
//             DT: '',
//         };
//     }
// }

// const getUserAvatar = async (email) => {
//     try {
//         let data = await db.Users.findOne({
//             where: { email: email },
//             attributes: ['avatar']
//         })
//         if(data) {
//             return {
//                 EC: 0,
//                 EM: 'Get avatar success',
//                 DT: data
//             }
//         }
//     } catch (error) {
//         console.log('getUserAvatar sv err: ', error);
//         return {
//             EM: 'Something wrong in service',
//             EC: '-5',
//             DT: '',
//         };
//     }
// }

// const deleteUserAvatar = async (email) => {
//     try {
//         await db.Users.update({
//             avatar: ''
//         },
//         {
//             where: { email: email }
//         })
//         return {
//             EC: 0,
//             EM: 'Delete avatar success',
//             DT: ''
//         }
        
//     } catch (error) {
//         console.log('getUserAvatar sv err: ', error);
//         return {
//             EM: 'Something wrong in service',
//             EC: '-5',
//             DT: '',
//         };
//     }
// }

// const getAccountInfo = async (email) => {
//     let user = await db.Users.findOne({
//         where: { email: email },
//         attributes: ['email', 'avatar', 'address', 'id', 'phone', 'username'],
//         raw: true,
//     })
//     // followings
//     let followingListId = await db.Follows.findAll({
//         where: { follower: +user.id },
//         attributes: [ 'userToFollow' ],
//         raw: true,
//     })
//     followingListId = followingListId.map(item => (item.userToFollow))
//     const listFollowing = await db.Users.findAll({ where: { id: followingListId } })

//     // followers
//     let followersListId = await db.Follows.findAll({
//         where: { userToFollow: +user.id },
//         attributes: [ 'follower' ],
//         raw: true,
//     })
//     followersListId = followersListId.map(item => (item.follower))
//     const listFollower = await db.Users.findAll({ where: { id: followersListId } })

//     return {
//         user,
//         listFollowing,
//         listFollower
//     }
// }

// const getOtherUserInfoSV = async (email) => {
//     let user = await db.Users.findOne({
//         where: { email: email },
//         attributes: [ 'id', 'email', 'username', 'address', 'phone', 'avatar' ]
//     })
//     return user
// }

module.exports = {
    getInfoSV,
    getUserPostsSV,
    // uploadUserAvatar,
    // getUserAvatar,
    // deleteUserAvatar,
    // getOtherUserInfoSV,
    // getAccountInfo
}